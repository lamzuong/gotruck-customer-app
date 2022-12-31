import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.mainGreen,
  },
  logoName: {
    width: Dimensions.get("window").width,
    height: 120,
  },
  logoTruck: {
    width: Dimensions.get("window").width,
    height: 180,
  },
  swiper: {
    marginTop: 40,
    height: 200,
    headerTitle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 22,
      textAlign: "center",
    },
    bodyTitle: {
      marginTop: 10,
      color: "white",
      fontSize: 18,
      textAlign: "center",
    },
  },
  frameButton: {
    marginVertical: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
