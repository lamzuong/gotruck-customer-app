import { View, Text } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";

export default function Info({ navigation }) {
  // const focused = useIsFocused();
  // React.useEffect(() => {
  //   console.log(focused);
  //   navigation.navigate("Info");
  // }, [navigation, focused]);

  return (
    <View>
      <Text>Info</Text>
    </View>
  );
}
