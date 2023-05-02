import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  header: {
    borderBottomWidth: 1,
    padding: 5,
  },
  txtHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {},
  txtBody: {
    padding: 5,
    fontSize: 17,
    textAlign:"justify"
  },
});

export default styles;
