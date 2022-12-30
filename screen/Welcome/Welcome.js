import { View, Text, StatusBar } from "react-native";
import React from "react";

export default function Welcome({ navigation }) {
  return (
    <View>
      <StatusBar />
      <Text
        onPress={() => {
          navigation.navigate("BottomTabs");
        }}
      >
        Welcome
      </Text>
    </View>
  );
}
