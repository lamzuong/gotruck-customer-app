import Message from "../Message/Message";
import Info from "../Info/Info";

import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="Message"
        component={Message}
        options={{ tabBarLabel: "Tin nhắn" }}
      />
      <TopTab.Screen
        name="Info"
        component={Info}
        options={{ tabBarLabel: "Thông báo" }}
      />
    </TopTab.Navigator>
  );
}
