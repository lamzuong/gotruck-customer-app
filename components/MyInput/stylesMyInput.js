import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
  },
  iconHide: {
    paddingRight: 20,
    // paddingTop: 10,
  },
  error: {
    marginLeft: 30,
    marginVertical: 8,
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
