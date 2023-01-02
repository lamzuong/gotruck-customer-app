import styles from "./stylesMessage";
import Chat from "./Chat/Chat";
import Info from "./Info/Info";
import MyTabBar from "../../../components/MyTabBar/MyTabBar";

import { Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

export default function Message() {
  return (
    <>
      <Text style={styles.title}>Tin nhắn</Text>

      <TopTab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        style={{ backgroundColor: "white" }}
      >
        <TopTab.Screen
          name="Chat"
          component={Chat}
          options={{ tabBarLabel: "Trò chuyện" }}
          key={"Chat"}
        />
        <TopTab.Screen
          name="Info"
          component={Info}
          options={{ tabBarLabel: "Thông báo" }}
          key={"Info"}
        />
      </TopTab.Navigator>
    </>
  );
}
