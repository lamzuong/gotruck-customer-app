import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../../global/stylesGlobal';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  // Label
  label: {
    width: 120,
    fontSize: 17,
    fontWeight: 'bold',
  },
  // Content
  content: {
    marginLeft: 20,
    fontSize: 17,
    maxWidth: 170,
  },
  //==================
  viewNote: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    height: 100,

    txtNote: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      fontSize: 17,
    },
  },
  //==================
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
});

export default styles;
