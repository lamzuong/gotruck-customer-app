import styles from "./stylesShipping";
import MyOrder from "../../../../components/MyOrder/MyOrder";
import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";

export default function NotFinish() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {order.map((item, index) =>
        item.status == "Đang giao" ? <MyOrder order={item} key={index} /> : null
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
