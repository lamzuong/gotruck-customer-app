import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.mainGreen,
    alignItems: "center",
  },
  logoName: {
    marginLeft: -widthScreen / 5,
    width: Dimensions.get("window").width,
    height: 120,
  },
  phone: {
    flexDirection: "row",
    justifyContent: "center",

    viewFlagVn: {
      width: 100,
      height: 50,
      marginRight: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 10,
    },
    flagVn: {
      height: 30,
      width: 40,
    },
    phoneVn: {
      fontSize: 16,
      paddingHorizontal: 5,
    },
  },
  viewAction: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",

    txtAction: {
      fontSize: 16,
      fontWeight: "bold",
      color: "white",
    },
    viewSavePass: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: -6,
    },
  },
  viewButton: {
    marginVertical: 20,
  },
});

export default styles;
