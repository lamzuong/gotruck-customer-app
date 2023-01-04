import { publicRoutes } from "./routes/routes";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "white",
      }}
    >
      {publicRoutes.map((route, index) => {
        return (
          <Tab.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={{
              headerShown: route.header,
              tabBarLabel: () => null,
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({ focused }) =>
                focused ? route.iconActive : route.iconInactive,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
