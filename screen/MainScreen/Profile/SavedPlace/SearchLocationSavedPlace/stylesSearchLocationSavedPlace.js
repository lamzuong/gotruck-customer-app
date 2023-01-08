import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginLeft: 30,
  },
  txtInput: {
    paddingRight: 10,
    fontSize: 18,
    width: "95%",
  },
  buttonFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: "100%",
    borderTopWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
  },
  txtFooter: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default styles;
