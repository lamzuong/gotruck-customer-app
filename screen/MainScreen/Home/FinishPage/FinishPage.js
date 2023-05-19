import styles from './stylesFinishPage';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, Image, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FinishPage({ navigation }) {
  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('NewOrder', { resetValue: true });
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../../assets/images/logo-name-white.png')}
          style={styles.logoName}
        />
        <View style={styles.viewFinish}>
          <Text style={styles.viewFinish.title}>
            Đơn hàng được đặt thành công !!{'\t\t'}
            <MaterialCommunityIcons name="truck-fast" size={25} color="white" />
          </Text>
          <Image
            source={require('../../../../assets/images/logo-truck.png')}
            style={styles.viewFinish.logoTruck}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        {/* <MyButton
          type={'large'}
          text="Tiếp tục đặt giao"
          txtColor="white"
          btnColor={'#F17605'}
          style={{ marginBottom: 20 }}
          action={() => {
            navigation.navigate('NewOrder');
          }}
        /> */}
        <MyButton
          type={'large'}
          text="Trở về trang chủ"
          btnColor={'black'}
          txtColor="white"
          action={() => {
            navigation.navigate('NewOrder', { resetValue: true });
          }}
        />
      </View>
    </View>
  );
}
