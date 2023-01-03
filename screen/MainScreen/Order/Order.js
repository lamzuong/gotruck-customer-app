import styles from "./stylesOrder";
import NotFinish from "./NotFinish/NotFinish";
import Finished from "./Finished/Finished";
import Cancelled from "./Cancelled/Cancelled";
import MyTabBar from "../../../components/MyTabBar/MyTabBar";

import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTab = createMaterialTopTabNavigator();

export default function Order() {
  return (
    <>
      <Text style={styles.title}>Đơn hàng</Text>

      <TopTab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        style={{ backgroundColor: "white" }}
      >
        <TopTab.Screen
          name="NotFinish"
          component={NotFinish}
          options={{ tabBarLabel: "Chưa hoàn thành" }}
          key={"NotFinish"}
        />
        <TopTab.Screen
          name="Finished"
          component={Finished}
          options={{ tabBarLabel: "Hoàn thành" }}
          key={"Finished"}
        />
        <TopTab.Screen
          name="Cancelled"
          component={Cancelled}
          options={{ tabBarLabel: "Đã hủy" }}
          key={"Cancelled"}
        />
      </TopTab.Navigator>
    </>
  );
}
