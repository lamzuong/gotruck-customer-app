import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesGlobal.mainGreen,
    justifyContent: 'space-between',
  },
  logoName: {
    marginLeft: -widthScreen / 5,
    width: Dimensions.get('window').width,
    height: 120,
  },
  viewFinish: {
    padding: 40,
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
    },
    logoTruck: {
      width: 300,
      height: 200,
    },
  },
});

export default styles;
