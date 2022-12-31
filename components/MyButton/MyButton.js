import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./stylesMyButton";

export default function MyButton({
  type,
  btnColor,
  text,
  txtColor,
  borderWidth,
  borderColor,
  action,
  disable,
  ...props
}) {
  let typeButton;
  switch (type) {
    case "small":
      typeButton = styles.small;
      break;
    case "medium":
      typeButton = styles.medium;
      break;
    case "large":
      typeButton = styles.large;
      break;
    default:
      break;
  }
  return disable ? (
    <View
      style={[
        typeButton,
        { backgroundColor: btnColor, borderColor, borderWidth },
      ]}
      onPress={action}
      {...props}
    >
      <Text style={[typeButton.text, { color: txtColor }]}>{text}</Text>
    </View>
  ) : (
    <TouchableOpacity
      style={[
        typeButton,
        { backgroundColor: btnColor, borderColor, borderWidth },
      ]}
      onPress={action}
      {...props}
    >
      <Text style={[typeButton.text, { color: txtColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}
