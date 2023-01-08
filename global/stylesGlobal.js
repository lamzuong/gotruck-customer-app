import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Color
  mainGreen: "#04AF46",
  lightGreen: "rgb(192,243,207)",
  darkGreen: "rgb(20,108,47)",

  grey: "#7A7A7A",
  lightGrey: "rgb(245,245,245)",
  lightDarkGrey: "rgb(235,235,235)",
  darkGrey: "rgb(200,200,200)",

  lightOrange: "rgb(254,244,235)",
  darkOrange: "rgb(246,103,11)",

  skyBlue: "#0DBEBE",

  // Layout
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
