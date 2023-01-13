import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImg: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: stylesGlobal.mainGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 300,
    padding: 10,
    borderRadius: 10,
  },
  txtPlaceholder: {
    color: 'grey',
    fontSize: 17,
    marginLeft: 8,
  },
  imgAdvertise: {
    width: 300,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default styles;
