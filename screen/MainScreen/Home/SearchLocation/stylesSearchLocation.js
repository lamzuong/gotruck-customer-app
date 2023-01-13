import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //--------------------------------
  iconBack: {
    position: 'absolute',
    top: 10,
  },
  txtSearch: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    marginLeft: 40,
  },
  txtResult: {
    fontSize: 16,
  },
  //--------------------------------
  buttonFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderTopWidth: 1,
    borderColor: stylesGlobal.lightDarkGrey,
  },
  txtFooter: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default styles;
