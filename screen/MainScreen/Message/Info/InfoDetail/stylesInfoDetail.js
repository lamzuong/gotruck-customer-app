import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../../../../global/stylesGlobal';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 18,
    backgroundColor: stylesGlobal.mainGreen,

    txtHeader: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  },
  //=======================
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default styles;
