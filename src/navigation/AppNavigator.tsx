import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


import Login from "../screens/login/Login";
import Signup from "../screens/signup/Signup";
import Dashboard from "../screens/dashboard/Dashboard";
import Reports from "../screens/reports/Reports";
import Search from "../screens/search/Search";
import Workspace from "../screens/workspace/Workspace";
import CustomTabBar from "./CustomTabBar";

import { getStorage } from "../utils/storage";
import STORAGE_KEYS from "../utils/storageKeys";
import WorkspaceFolders from "../screens/workspace/WorkspaceFolders";
import WorkspaceFiles from "../screens/workspace/WorkspaceFiles";
import WorkspaceLinks from "../screens/workspace/WorkspaceLinks";
import CustomTopTabBar from "./CustomTopTabBar";
import { COLORS } from "../theme/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

/* -------------------- Bottom Tabs -------------------- */

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Reports" component={Reports} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

/* -------------------- Top Tabs -------------------- */

export const TopTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        sceneStyle: { backgroundColor: COLORS.Transparent }
      }}
      tabBar={(props) => <CustomTopTabBar {...props} />}
    >
      <TopTab.Screen name="WorkspaceFolders" component={WorkspaceFolders} />
      <TopTab.Screen name="WorkspaceFiles" component={WorkspaceFiles} />
      <TopTab.Screen name="WorkspaceLinks" component={WorkspaceLinks} />
    </TopTab.Navigator>
  );
};

/* -------------------- Root Navigator -------------------- */

const AppNavigator = () => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    checkLogin();
  }, [isLogin]);

  const checkLogin = async () => {
    try {
      const loginStatus = await getStorage(STORAGE_KEYS.IS_LOGIN);
      setIsLogin(loginStatus === true || loginStatus === "true");
    } catch (error) {
      setIsLogin(false);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Group>
        <Stack.Group screenOptions={{ header: () => null }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="TopTabs" component={TopTabs} />
          <Stack.Screen name="Workspace" component={Workspace} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;