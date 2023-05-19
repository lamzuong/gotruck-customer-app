import MyButton from '../../components/MyButton/MyButton';
import styles from './stylesWelcome';

import { View, Text, StatusBar, Image } from 'react-native';
import React, { useContext, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../api/axiosClient';
import { AuthContext } from '../../context/AuthContext';
import { LoginSuccess, SetListOrder, SetLocation } from '../../context/AuthAction';
import { getLocationCurrentOfUser } from '../../global/utilLocation';

export default function Welcome({ navigation }) {
  const isFocus = useIsFocused();
  const { dispatch, user } = useContext(AuthContext);

  useEffect(() => {
    const loginFast = async () => {
      const phoneLocal = await AsyncStorage.getItem('phoneCus');
      if (phoneLocal) {
        const userLogin = await axiosClient.get('/gotruck/auth/user/' + phoneLocal);
        const orderList = await axiosClient.get('gotruck/order/user/' + userLogin._id);
        const currentLocation = await getLocationCurrentOfUser();
        if (currentLocation) {
          await AsyncStorage.setItem('phoneCus', phoneLocal);
          dispatch(LoginSuccess(userLogin));
          dispatch(SetLocation(currentLocation));
          dispatch(SetListOrder(orderList));
          navigation.navigate('MainScreen');
        }
      }
    };
    loginFast();
  }, [isFocus]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Image source={require('../../assets/images/logo-name-white.png')} style={styles.logoName} />
      <Image source={require('../../assets/images/logo-truck.png')} style={styles.logoTruck} />
      <Swiper style={styles.swiper} autoplay={true}>
        <View>
          <Text style={styles.swiper.headerTitle}>VIỆC GÌ KHÓ{'\n'}CỨ ĐỂ GOTRUCK LO</Text>
          <Text style={styles.swiper.bodyTitle}>
            Nhận hàng tận nơi, giao hàng tận chỗ{'\n'}
            Kết nối mọi lúc mọi nơi
          </Text>
        </View>
        <View>
          <Text style={styles.swiper.headerTitle}>NHẬN KẾT NỐI{'\n'}ĐÓNG GÓP CHO XÃ HỘI</Text>
          <Text style={styles.swiper.bodyTitle}>
            Trở thành đối tác của GoTruck để cải thiện{'\n'}
            cuộc sống của bạn và hơn thế nữa
          </Text>
        </View>
      </Swiper>
      <View style={styles.frameButton}>
        <MyButton
          type="medium"
          btnColor="white"
          text="ĐĂNG KÝ"
          txtColor="green"
          borderWidth={1}
          borderColor="green"
          action={() => {
            navigation.navigate('SignUp');
          }}
        />
        <MyButton
          type="medium"
          btnColor="black"
          text="ĐĂNG NHẬP"
          txtColor="white"
          action={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  );
}
