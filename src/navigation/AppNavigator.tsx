import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Auth Screens
import Login from "../screens/login/Login";
import Signup from "../screens/signup/Signup";

// Main Screens
import Dashboard from "../screens/dashboard/Dashboard";
import Reports from "../screens/reports/Reports";
import Search from "../screens/search/Search";
import CustomTabBar from "./CustomTabBar";
import Workspace from "../screens/workspace/Workspace";
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
        <Tab.Screen name="Workspace" component={Workspace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
