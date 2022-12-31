import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  small: {
    width: Dimensions.get("window").width / 4 - 15,
    height: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  medium: {
    width: Dimensions.get("window").width / 2 - 30,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    text: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
  large: {
    width: Dimensions.get("window").width - 60,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    text: {
      fontSize: 18,
      fontWeight: "bold",
    },
  },
});

export default styles;
