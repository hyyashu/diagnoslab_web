import "./tasks/locationTask";
import "./tasks/notificationTask";

import * as React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";

import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";

import {
  NavigationContainer,
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Navigation } from "./screens";
import { useNotifications } from "./hooks/useNotifications";

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");
const queryClient = new QueryClient();

/* =========================
   BRAND COLORS
========================= */

const brand = {
  primaryLight: "#DC2626", // Red 600
  primaryDark: "#B91C1C",  // Red 700

  secondaryLight: "#16A34A", // Green 600
  secondaryDark: "#15803D",  // Green 700
};

/* =========================
   LIGHT THEME
========================= */

const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    primary: brand.primaryLight,
    secondary: brand.secondaryLight,

    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceVariant: "#F3F4F6",

    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",

    onBackground: "#000000",
    onSurface: "#000000",

    outline: "#E5E7EB",
    error: "#EF4444",
  },
};

/* =========================
   DARK THEME
========================= */

const DarkThemeCustom = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    primary: brand.primaryDark,
    secondary: brand.secondaryDark,

    background: "#000000",
    surface: "#121212",
    surfaceVariant: "#1E1E1E",

    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",

    onBackground: "#FFFFFF",
    onSurface: "#FFFFFF",

    outline: "#374151",
    error: "#F87171",
  },
};

export function App() {
  const colorScheme = useColorScheme();
  useNotifications();

  const isDark = colorScheme === "dark";

  const paperTheme = isDark ? DarkThemeCustom : LightTheme;

  const navigationTheme = {
    ...(isDark ? NavigationDarkTheme : NavigationLightTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationLightTheme.colors),

      background: paperTheme.colors.background,
      card: paperTheme.colors.surface,
      primary: paperTheme.colors.primary,
      text: paperTheme.colors.onBackground,
      border: paperTheme.colors.outline,
      notification: paperTheme.colors.primary,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={paperTheme}>
       
            <BottomSheetModalProvider>
              <Navigation />
            </BottomSheetModalProvider>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}