import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../global/stylesGlobal";

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  insideInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  txtInput: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,

    haveClear: {
      paddingRight: 40,
    },
  },
  iconHide: {
    paddingRight: 20,
    marginLeft: -40,
  },
  error: {
    marginVertical: 8,
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
