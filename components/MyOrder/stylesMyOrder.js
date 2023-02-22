import { Dimensions, StyleSheet } from 'react-native';
import stylesGlobal from '../../global/stylesGlobal';

const styles = StyleSheet.create({
  order: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 10,
  },
  inline: {
    flexDirection: 'row',
    marginVertical: 5,
    width: '70%',
  },
  inlineBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',

    short: {
      width: 100,
    },
    long: {
      width: 120,
    },
  },
  content: {
    fontSize: 17,
  },
  customerButton: {
    height: 40,
    backgroundColor: stylesGlobal.mainGreen,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default styles;
