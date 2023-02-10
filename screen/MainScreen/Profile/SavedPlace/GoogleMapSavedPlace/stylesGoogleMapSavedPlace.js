import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../../global/stylesGlobal";


const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  marker: {
    width: 50,
    height: 50,
    position: "absolute",
    // top: Dimensions.get("window").height / 2.7,
  },
  chonTrenBanDo: {
    position: "absolute",
    width: "90%",
    padding:5,
    backgroundColor: "#04AF46",
    borderRadius: 8,
    bottom: 10,
    alignItems:"center"
  },
  iconBack:{
    top:20,
    left:20,
    zIndex:1,
    position:"absolute"
  }
});

export default styles;
