import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
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
    alignItems: "flex-end",
    height: 45,
    width: "100%",
    borderTopWidth: 1,
    bottom: 15,
    borderColor: stylesGlobal.lightDarkGrey,
  },
  txtFooter: {
    marginLeft: 10,
    fontSize: 16,
  },

  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});

export default styles;
