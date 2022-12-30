import { StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.black,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 300,
    height: 400,
  },
});

export default styles;
