import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    // padding: 20,
  },
  viewCollapse: {
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
  },
  labelHeader: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    paddingTop: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: stylesGlobal.darkGrey,
  },
  error: {
    marginLeft: 10,
    color: 'red',
  },
  address: {
    padding: 10,
    fontSize: 18,
  },
  viewNote: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  note: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: stylesGlobal.grey,
  },
  txtNote: {
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: stylesGlobal.darkGrey,
    padding: 20,
    backgroundColor: 'white',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default styles;
