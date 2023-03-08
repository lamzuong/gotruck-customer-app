import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
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
    // alignItems: "center",
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
  container2: {
    flex: 1,
    position: 'absolute',
    zIndex: 8,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    height: 250,
    top: heightScreen / 6,
    width: widthScreen / 1.2,
    left:30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  close: {
    top: 10,
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  contentCancel: {
    flex: 1,
    alignItems: 'center',
  },
  viewInput: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  btnCancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 10,
  },
});

export default styles;
