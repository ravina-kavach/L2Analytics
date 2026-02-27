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
import CustomWorkspaceTabBar from "./CustomWorkspaceTabBar";
import { COLORS } from "../theme/colors";
import FolderDetails from "../screens/workspace/FolderDetails";

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

export const WorkspaceTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: { backgroundColor: COLORS.Transparent },
        headerShown: false
      }}
      tabBar={(props) => (
        <CustomWorkspaceTabBar
          {...props} />
      )}
    >
      <Tab.Screen name="WorkspaceFolders" component={WorkspaceFolders} />
      <Tab.Screen name="WorkspaceFiles" component={WorkspaceFiles} />
      <Tab.Screen name="WorkspaceLinks" component={WorkspaceLinks} />
    </Tab.Navigator>
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
          <Stack.Screen name="WorkspaceTabs" component={WorkspaceTabs} />
          <Stack.Screen name="Workspace" component={Workspace} />
          <Stack.Screen name="FolderDetails" component={FolderDetails} />
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