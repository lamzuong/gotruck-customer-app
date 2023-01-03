import styles from "./stylesFinished";
import MyOrder from "../../../../components/MyOrder/MyOrder";
import order from "../dataOrder";

import { View, Text, FlatList } from "react-native";
import React from "react";

export default function Finished() {
  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        renderItem={({ item, index }) => {
          return item.status == "Đã giao" ? (
            <MyOrder order={item} key={index} />
          ) : null;
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
