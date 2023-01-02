import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
  },
  viewAccount: {
    flexDirection: "row",
    alignItems: "center",

    avatar: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    name: {
      fontSize: 25,
    },
    editAccount: {
      marginVertical: 10,
      fontSize: 16,
      color: "grey",
    },
  },
  flatList: {
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
  },
  txtItem: {
    marginLeft: 15,
    fontSize: 18,
  },
});

export default styles;
