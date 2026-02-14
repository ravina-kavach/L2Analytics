import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "../screens/Dashboard";
import Upload from "../screens/Upload";
import Reports from "../screens/Reports";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Upload" component={Upload} />
        <Tab.Screen name="Reports" component={Reports} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
