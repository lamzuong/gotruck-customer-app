import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  small: {
    width: Dimensions.get("window").width / 4 - 15,
    height: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    text: {
      fontSize: 16,
      fontWeight: "bold",
      marginHorizontal: 5,
    },
  },
  medium: {
    width: Dimensions.get("window").width / 2 - 30,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    text: {
      fontSize: 18,
      fontWeight: "bold",
      marginHorizontal: 5,
    },
  },
  large: {
    width: Dimensions.get("window").width - 60,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    text: {
      fontSize: 18,
      fontWeight: "bold",
      marginHorizontal: 5,
    },
  },
});

export default styles;
