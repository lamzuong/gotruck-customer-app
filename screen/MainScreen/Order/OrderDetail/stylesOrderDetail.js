import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    width: 150,
    fontSize: 17,
    fontWeight: "bold",
  },
  content: {
    fontSize: 17,
  },
  noteView: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    height: 100,
  },
  txtNote: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 17,
  },
});

export default styles;
