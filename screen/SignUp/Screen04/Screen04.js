import styles from "../stylesSignUp";

import { View, Text, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Screen04() {
  return (
    <View style={styles.screen04}>
      <Text style={styles.screen04.title}>
        Hãy bắt đầu những đơn hàng đầu tiên nào{"\t\t"}
        <MaterialCommunityIcons name="truck-fast" size={25} color="white" />
      </Text>
      <Image
        source={require("../../../assets/images/logo-truck.png")}
        style={styles.screen04.logoTruck}
      />
    </View>
  );
}
