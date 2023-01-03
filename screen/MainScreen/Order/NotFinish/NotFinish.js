import styles from "./stylesNotFinish";
import MyOrder from "../../../../components/MyOrder/MyOrder";
import order from "../dataOrder";

import { View, Text, FlatList } from "react-native";
import React from "react";

export default function NotFinish() {
  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={({ item, index }) => {
          return item.status == "Chưa nhận" || item.status == "Đang giao" ? (
            <MyOrder order={item} key={index} />
          ) : null;
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
