import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
  },
  label: {
    fontSize: 18,
    color: 'grey',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 10,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,

    addition: {
      justifyContent: 'space-between',
      paddingRight: 10,
    },
  },
  font18: {
    fontSize: 18,

    addition: {
      width: '85%',
      marginRight: 10,
    },
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
  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  map: {
    position: 'absolute',
    height: 1,
    width: 1,
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
    bottom: 200,
  },
  chupanh: {
    fontSize: 20,
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -180,
  },
});

export default styles;
