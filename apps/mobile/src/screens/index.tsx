import {
  createStaticNavigation,
  StaticParamList,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useAuthStore, useIsLoggedIn, useIsLoggedOut } from "../store/authStore";
import { navigationRef } from "../navigation/navigationRef";
import Login from "./login/Login";
import SettingsScreen from "./settings/SettingsScreen";
import LeadScreen from "./leads/LeadScreen";
import Meeting from "./meeting/MeetingScreen";
import Home from "./home";
import UpdatesScreen from "./updates/UpdateScreen";
import LocationDemoScreen from "./locationDemo/LocationDemoScreen";
import { NotFound } from "./NotFound";
import ProfileHeader from "../components/settings/ProfileHeader";
import AdminMeetingLogScreen from "./meeting/AdminMeetingScreen";
import HomeCollectionBookingsScreen from "./booking/CollectionScreen";
import { useTheme as usePaperTheme } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator();

/* ---------------- ROUTES ---------------- */
/* Roles as the API names them. */
/* Role names from @diagno/schemas (access.ts). The API checks permissions
   on every request; these lists only decide which screens appear. */
const EVERYONE = ["superadmin", "manager", "front_desk", "field", "lab", "user"];
const ADMINS = ["superadmin", "manager"];

/* Attendance and Admin Attendance are hidden for now; their screens are
   still in ./attendance and can be added back here. */

const drawerRoutes = [
  {
    name: "Dashboard",
    component: Home,
    icon: "grid-outline",
    roles: EVERYONE,
  },
  {
    name: "Leads",
    component: LeadScreen,
    icon: "people-outline",
    roles: EVERYONE,
  },
  {
    name: "Meeting",
    component: Meeting,
    icon: "calendar-outline",
    roles: EVERYONE,
  },
  {
    name: "Admin Meeting",
    component: AdminMeetingLogScreen,
    icon: "calendar-outline",
    roles: ADMINS,
  },
  {
    name: "Collection",
    component: HomeCollectionBookingsScreen,
    icon: "medkit-outline",
    roles: EVERYONE,
  },
  {
    name: "Settings",
    component: SettingsScreen,
    icon: "settings-outline",
    roles: EVERYONE,
  },
  {
    name: "Location Demo",
    component: LocationDemoScreen,
    icon: "location-outline",
    roles: EVERYONE,
  },
];

/* ---------------- CUSTOM DRAWER ---------------- */

function CustomDrawerContent(props: any) {
  const theme = usePaperTheme();
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.background }}>
      <ProfileHeader />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

/* ---------------- MAIN DRAWER ---------------- */

function MainDrawer() {
  const userRole = useAuthStore((s) => s.user?.role ?? "front_desk");
  const theme = usePaperTheme();
  const allowed = drawerRoutes.filter((r) => r.roles.includes(userRole));

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",

        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate("Updates")}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="notifications-outline" size={24} color={theme.colors.primary} />
          </Pressable>
        ),

        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 260,
        },

        drawerActiveTintColor: theme.colors.onPrimary,
        drawerInactiveTintColor: theme.colors.primary,

        drawerActiveBackgroundColor: theme.colors.primary,
        drawerInactiveBackgroundColor: "transparent",

      
      })}
    >
      {allowed.map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name={route.icon as any} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

/* ---------------- ROOT STACK ---------------- */

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      if: useIsLoggedOut,
      options: { headerShown: false },
    },
    Main: {
      screen: MainDrawer,
      if: useIsLoggedIn,
      options: { headerShown: false },
    },
    Updates: {
      screen: UpdatesScreen,
      options: { presentation: "modal", title: "Updates" },
    },
    // AddLead: {
    //   screen: AddLeadScreen,
    //   options: { presentation: "modal", title: "Add Lead" },
    // },
    NotFound: {
      screen: NotFound,
      options: { title: "404" },
      linking: { path: "*" },
    },
  },
});

const StaticNavigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

export { navigationRef } from "../navigation/navigationRef";

/* ---------------- NAVIGATION ROOT ---------------- */

export function Navigation() {
  return <StaticNavigation ref={navigationRef} onReady={() => SplashScreen.hideAsync()} />;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  drawerName: {

    marginTop: 8,
    fontWeight: "600",
  },
  drawerRole: {
  },
});
