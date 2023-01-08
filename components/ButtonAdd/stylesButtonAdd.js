import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  btnAdd: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    borderColor: stylesGlobal.mainGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  iconAdd: {
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderRadius: 100,
    borderStyle: "dashed",
    borderColor: stylesGlobal.mainGreen,
    color: stylesGlobal.mainGreen,
  },
});

export default styles;
