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
  viewInput: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: 'grey',
  },
});

export default styles;
