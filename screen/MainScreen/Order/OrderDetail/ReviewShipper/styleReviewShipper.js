import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lblRating: { fontSize: 20, marginBottom: 10 },
  rating: { flex: 0.2, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 0.7, paddingHorizontal: 10 ,alignItems:'center'},
  txtcontent: { fontSize: 18, marginBottom: 10 },
  button: { flex: 0.1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
});

export default styles;
