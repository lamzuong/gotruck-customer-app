import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  // CSS View
  wrapper: {},
  viewInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  viewInputHaveClear: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  insideInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  //------------------
  txtInput: {
    width: "100%",
    paddingRight: 10,
    fontSize: 18,
  },
  error: {
    marginVertical: 8,
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
