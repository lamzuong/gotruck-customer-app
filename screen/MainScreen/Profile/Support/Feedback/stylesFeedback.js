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
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  removeImage: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 88,
    top: -8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -180,
  },
  modalView: {
    width: '70%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    position: 'absolute',
    bottom: 120,
  },
  chupanh: {
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default styles;
