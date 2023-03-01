import { Dimensions, StyleSheet } from "react-native";
import stylesGlobal from "../../../../global/stylesGlobal";

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
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
    left: 10,
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
