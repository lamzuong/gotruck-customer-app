import styles from './stylesMyAddress';
import stylesGlobal from '../../global/stylesGlobal';
import MyButton from '../MyButton/MyButton';

import { View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function MyAddress({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[stylesGlobal.inline, { marginBottom: 10 }]}>
        <Text style={styles.label}>Họ tên</Text>
        <Text style={styles.content}>{item.name}</Text>
      </View>
      <View style={[stylesGlobal.inline, { marginBottom: 10 }]}>
        <Text style={styles.label}>Địa chỉ</Text>
        <Text style={styles.content}>{item.address}</Text>
      </View>
      <View style={[stylesGlobal.inline, { marginBottom: 10 }]}>
        <Text style={styles.label}>Điện thoại</Text>
        <Text style={styles.content}>{item.phone}</Text>
      </View>
      <View style={stylesGlobal.inlineBetween}>
        <MyButton type={'small'} text="Xóa" btnColor={'red'} txtColor="white" action={() => {}} />
        <MyButton
          type={'small'}
          text="Sửa"
          btnColor={'orange'}
          txtColor="white"
          action={() => {
            navigation.navigate('FormSavedPlace', {
              item: item,
          
            });
          }}
        />
      </View>
    </View>
  );
}
