import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 270,
  },
  iconBack: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  coverImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginTop: -58,
  },
  viewAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 130,
    height: 130,
    borderWidth: 0.5,
    borderRadius: 100,
    position: 'absolute',
    left: widthScreen / 2 - 65,
    top: 130,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  camera: {
    position: 'absolute',
    right: 5,
    bottom: 10,
  },
  viewInput: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: 'grey',
  },
  flagVn: {
    width: 50,
    height: 30,
  },
  viewNormal: {
    marginVertical: 20,
    marginLeft: 10,
    paddingHorizontal: 20,
  },
  cam: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 85,
    aspectRatio: 1,
    padding: 1,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    bottom: -12,
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
    position:"absolute"
  },
  chupanh: {
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default styles;
