import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    marginHorizontal: 20,
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

    isSelected: {
      color: "white",
    },
    noSelected: {
      color: stylesGlobal.darkGreen,
    },
  },
});

export default styles;
