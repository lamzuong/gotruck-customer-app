import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  container2: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    width: 90,
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    width: "70%",
    fontSize: 16,
  },
});

export default styles;
