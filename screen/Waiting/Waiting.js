import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import styles from "./stylesWaiting";

export default function Waiting({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo-welcome.png")}
        style={styles.logoImage}
      />
    </View>
  );
}
