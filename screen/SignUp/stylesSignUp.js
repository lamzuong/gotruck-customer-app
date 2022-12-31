import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.mainGreen,
  },
  logoName: {
    marginLeft: -widthScreen / 5,
    width: Dimensions.get("window").width,
    height: 120,
  },
  txtHeader: {
    marginTop: 50,
    marginLeft: 40,
    lineHeight: 28,
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  txtLabel: {
    marginTop: 50,
    marginLeft: 40,
    color: "white",
    fontSize: 17,
  },
  phone: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,

    viewFlagVn: {
      width: 100,
      height: 50,
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
  otp: {
    marginTop: 20,
    marginLeft: 10,
  },
  button: {
    alignItems: "center",
    marginVertical: 20,
  },
  screen04: {
    padding: 40,
    alignItems: "center",
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: "white",
    },
    logoTruck: {
      width: 300,
      height: 200,
    },
  },
});

export default styles;
