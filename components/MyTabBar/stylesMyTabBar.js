import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,

    isSelected: {
      backgroundColor: stylesGlobal.darkGreen,
      alignItems: "center",
    },
    noSelected: {
      backgroundColor: stylesGlobal.lightGreen,
      alignItems: "center",
    },
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",

    isSelected: {
      color: "white",
    },
    noSelected: {
      color: stylesGlobal.darkGreen,
    },
  },
});

export default styles;
