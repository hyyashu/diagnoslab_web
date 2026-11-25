import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import * as Location from "expo-location";
import { usePowerState } from "expo-battery";
import type { LocationObject, LocationOptions, LocationTaskOptions } from "expo-location";
import { useLocationStore } from "../store/locationStore";
import { BACKGROUND_LOCATION_TASK_NAME } from "../tasks/locationTask";

export type LocationMode = "foreground" | "background";

export interface UseLocationOptions {
  mode?: LocationMode;
  locationOptions?: LocationOptions;
  backgroundTaskName?: string;
  backgroundTaskOptions?: LocationTaskOptions;
  autoStart?: boolean;
}

export interface UseLocationReturn {
  location: LocationObject | null;
  error: string | null;
  isLoading: boolean;
  permissionStatus: Location.LocationPermissionResponse | null;
  battery: {
    batteryLevel: number;
    batteryState: number;
    lowPowerMode: boolean;
  };
  startTracking: () => Promise<void>;
  stopTracking: () => Promise<void>;
  requestPermissions: () => Promise<boolean>;
}

const DEFAULT_LOCATION_OPTIONS: LocationOptions = {
  accuracy: Location.Accuracy.Balanced,
};

export function useLocation(options: UseLocationOptions = {}): UseLocationReturn {
  const {
    mode = "foreground",
    locationOptions = DEFAULT_LOCATION_OPTIONS,
    backgroundTaskName = BACKGROUND_LOCATION_TASK_NAME,
    backgroundTaskOptions,
    autoStart = false,
  } = options;

  const powerState = usePowerState();
  const battery = {
    batteryLevel: powerState.batteryLevel,
    batteryState: powerState.batteryState,
    lowPowerMode: powerState.lowPowerMode,
  };

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<Location.LocationPermissionResponse | null>(null);

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const isTrackingRef = useRef(false);

  const storeLocation = useLocationStore((s) => s.lastLocation);
  const storeError = useLocationStore((s) => s.lastError);

  const effectiveLocation = mode === "background" ? storeLocation : location;
  const effectiveError = mode === "background" ? storeError : error;

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(foreground);
    if (!foreground.granted) return false;
    if (mode === "background") {
      const background = await Location.requestBackgroundPermissionsAsync();
      if (!background.granted) return false;
    }
    return true;
  }, [mode]);

  const startTrackingForeground = useCallback(async () => {
    if (subscriptionRef.current) return;
    const granted = await requestPermissions();
    if (!granted) {
      setError("Location permission denied");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const sub = await Location.watchPositionAsync(
        locationOptions,
        (loc) => {
          setLocation(loc);
          setIsLoading(false);
        },
        (err) => {
          setError(err);
          setIsLoading(false);
        }
      );
      subscriptionRef.current = sub;
      isTrackingRef.current = true;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setIsLoading(false);
    }
  }, [locationOptions, requestPermissions]);

  const startTrackingBackground = useCallback(async () => {
    if (isTrackingRef.current) return;
    const granted = await requestPermissions();
    if (!granted) {
      useLocationStore.getState().setLastError("Location permission denied");
      return;
    }
    useLocationStore.getState().setLastError(null);
    setIsLoading(true);
    try {
      const opts: LocationTaskOptions = {
        ...locationOptions,
        ...backgroundTaskOptions,
      };
      if (Platform.OS === "android" && !opts.foregroundService) {
        opts.foregroundService = {
          notificationTitle: "Location tracking",
          notificationBody: "Tracking your location for visit tracking.",
        };
      }
      await Location.startLocationUpdatesAsync(backgroundTaskName, opts);
      isTrackingRef.current = true;
      setIsLoading(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      useLocationStore.getState().setLastError(msg);
      setIsLoading(false);
    }
  }, [
    backgroundTaskName,
    backgroundTaskOptions,
    locationOptions,
    requestPermissions,
  ]);

  const startTracking = useCallback(async () => {
    if (mode === "foreground") {
      await startTrackingForeground();
    } else {
      await startTrackingBackground();
    }
  }, [mode, startTrackingForeground, startTrackingBackground]);

  const stopTrackingForeground = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
    isTrackingRef.current = false;
  }, []);

  const stopTrackingBackground = useCallback(async () => {
    if (!isTrackingRef.current) return;
    try {
      await Location.stopLocationUpdatesAsync(backgroundTaskName);
    } finally {
      isTrackingRef.current = false;
    }
  }, [backgroundTaskName]);

  const stopTracking = useCallback(async () => {
    if (mode === "foreground") {
      stopTrackingForeground();
    } else {
      await stopTrackingBackground();
    }
  }, [mode, stopTrackingForeground, stopTrackingBackground]);

  useEffect(() => {
    let mounted = true;
    Location.getForegroundPermissionsAsync().then((status) => {
      if (mounted) setPermissionStatus(status);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!autoStart) return;
    startTracking();
  }, [autoStart, startTracking]);

  useEffect(() => {
    return () => {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
      isTrackingRef.current = false;
      Location.stopLocationUpdatesAsync(backgroundTaskName).catch(() => {});
    };
  }, [backgroundTaskName]);

  return {
    location: effectiveLocation,
    error: effectiveError,
    isLoading,
    permissionStatus,
    battery,
    startTracking,
    stopTracking,
    requestPermissions,
  };
}
