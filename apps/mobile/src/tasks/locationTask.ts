import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { useLocationStore } from "../store/locationStore";

export const BACKGROUND_LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";

TaskManager.defineTask<{ locations: Location.LocationObject[] }>(
  BACKGROUND_LOCATION_TASK_NAME,
  ({ data, error }) => {
    if (error) {
      useLocationStore.getState().setLastError(error.message);
      return Promise.resolve();
    }
    const locations = data?.locations;
    if (locations && locations.length > 0) {
      const last = locations[locations.length - 1];
      useLocationStore.getState().setLastLocation(last);
    }
    return Promise.resolve();
  }
);
