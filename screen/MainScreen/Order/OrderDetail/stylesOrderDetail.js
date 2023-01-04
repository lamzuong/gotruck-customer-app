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
  // Label
  label: {
    width: 150,
    fontSize: 17,
    fontWeight: "bold",
  },
  labelFooter: {
    width: 180,
    fontSize: 17,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  // Content
  contentHeader: {
    marginLeft: 20,
    fontSize: 17,
  },
  content: {
    fontSize: 17,
  },
  //==================
  viewNote: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    height: 100,

    txtNote: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      fontSize: 17,
    },
  },
  viewButton: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
  },
});

export default styles;
