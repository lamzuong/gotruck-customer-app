import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../../global/stylesGlobal";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  componentInput: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: "grey",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
  },
  error: {
    marginLeft: 10,
    color: 'red',
   
  },
});

export default styles;
