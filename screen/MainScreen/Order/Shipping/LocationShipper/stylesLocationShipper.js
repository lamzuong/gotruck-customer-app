import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 20,
  },
  searchContainer2: {
    position: 'absolute',
    // width: "90%",
    backgroundColor: '#228B22',
    top: 20,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#228B22',
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  iconBack: {
    top: 20,
    left: 20,
    zIndex: 1,
    position: 'absolute',
  },
  marker: {
    textAlign: 'center',
  },
  coordinate: {
    marginHorizontal: 75,
    backgroundColor: 'white',
    paddingHorizontal:5,
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
