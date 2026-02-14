import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Dashboard from "../screens/Dashboard";
import Upload from "../screens/Upload";
import Reports from "../screens/Reports";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName =
              route.name === "Dashboard"
                ? focused
                  ? "home"
                  : "home-outline"
                : route.name === "Upload"
                  ? focused
                    ? "cloud-upload"
                    : "cloud-upload-outline"
                  : route.name === "Reports"
                    ? focused
                      ? "document-text"
                      : "document-text-outline"
                    : focused
                      ? "search"
                      : "search-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >

        <Tab.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
        <Tab.Screen name="Upload" component={Upload} />
        <Tab.Screen name="Reports" component={Reports} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
