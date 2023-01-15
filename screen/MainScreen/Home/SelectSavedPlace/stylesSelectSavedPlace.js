import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    width: 90,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    width: '70%',
    fontSize: 16,
  },
  centerButton: {
    justifyContent: 'center',
  },
  btnTiepTuc: {
    width: Dimensions.get('window').width / 4 - 15,
    height: 40,
    backgroundColor: stylesGlobal.mainGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  txtTiepTuc: {
    color: 'white',
    fontSize: 16,
    fontWeight:"bold",
    marginHorizontal: 5,
  },
});

export default styles;
