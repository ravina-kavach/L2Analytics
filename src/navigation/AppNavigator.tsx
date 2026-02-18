import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Auth Screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";

// Main Screens
import Dashboard from "../screens/Dashboard";
import Upload from "../screens/Upload";
import Reports from "../screens/Reports";
import Search from "../screens/Search";
import { insets } from "../theme/metrics";
import { COLORS } from "../theme/colors";

import CustomTabBar from "./CustomTabBar";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* -------------------- Bottom Tabs -------------------- */

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

/* -------------------- Root Stack -------------------- */

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
