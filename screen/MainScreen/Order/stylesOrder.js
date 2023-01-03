import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    paddingLeft: 20,
    fontSize: 26,
    fontWeight: "bold",
    backgroundColor: "white",
  },
});

export default styles;
