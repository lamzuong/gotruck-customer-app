import styles from "./stylesButtonAdd";
import stylesGlobal from "../../global/stylesGlobal";

import { View, Text, Pressable } from "react-native";
import React from "react";

export default function ButtonAdd({ action }) {
  return (
    <Pressable style={styles.btnAdd} onPress={action}>
      <Text style={styles.iconAdd}>+</Text>
      <Text style={{ color: stylesGlobal.mainGreen }}>Thêm</Text>
    </Pressable>
  );
}
