import styles from './stylesLogin';
import stylesGlobal from '../../global/stylesGlobal';
import MyButton from '../../components/MyButton/MyButton';

import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import MyInput from '../../components/MyInput/MyInput';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../config';
import firebase from 'firebase/compat';

import axiosClient from '../../api/axiosClient';
import { AuthContext } from '../../context/AuthContext';
import {
  LoginSuccess,
  LoginStart,
  LoginFailure,
  SetListOrder,
  SetLocation,
} from '../../context/AuthAction';
import { getLocationCurrentOfUser } from '../../global/utilLocation';
import AnimatedLoader from 'react-native-animated-loader';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const label = ['Vui lòng nhập số điện thoại để tiếp tục', 'Nhập mã OTP để đăng nhập nào ^^ !!!'];

export default function Login({ navigation }) {
  const [screen, setScreen] = useState(1);
  const [verificationId, setVerificationId] = useState();
  const [checkLogin, setCheckLogin] = useState(false);
  const [validData, setValidData] = useState(false);
  const [phone, setPhone] = useState('');
  const [codeOTP, setcodeOTP] = useState('');
  const { dispatch, user } = useContext(AuthContext);

  const scrollViewRef = useRef();
  const recaptchaVerifier = useRef(null);

  const formatPhone = () => {
    let phoneTemp = phone;
    if (phone.charAt(0) != '0') {
      phoneTemp = '0' + phone;
    }
    return phoneTemp;
  };

  const sendVerification = async () => {
    const phone = formatPhone();

    // Login fast
    const userLogin = await axiosClient.get('gotruck/auth/user/' + phone);
    if (!userLogin.phone) {
      Alert.alert('Thông báo', 'Số điện thoại chưa được đăng kí1');
      return;
    }
    const orderList = await axiosClient.get('gotruck/order/user/' + userLogin._id);
    const currentLocation = await getLocationCurrentOfUser();
    if (currentLocation) {
      dispatch(SetLocation(currentLocation));
      dispatch(LoginSuccess(userLogin));
      dispatch(SetListOrder(orderList));
      toMainScreen();
    }
    //kết thúc

    // try {
    //   const currentLocation = await getLocationCurrentOfUser();
    //   if (currentLocation) {
    //     dispatch(SetLocation(currentLocation));
    //     const res = await axiosClient.get('/gotruck/auth/user/' + phone);
    //     if (!res.phone) {
    //       customAlert('Thông báo', 'Số điện thoại này chưa được đăng kí!', null);
    //     } else {
    //       const phoneProvider = new firebase.auth.PhoneAuthProvider();
    //       phoneProvider
    //         .verifyPhoneNumber('+84' + phone, recaptchaVerifier.current)
    //         .then((result) => {
    //           setVerificationId(result);
    //           nextScreen();
    //         })
    //         .catch((error) => {
    //           console.log(error?.code);
    //           if (error.code === 'auth/too-many-requests') {
    //             Alert.alert(
    //               'Thông báo',
    //               'Bạn đã yêu cầu gửi mã OTP quá nhiều lần\nVui lòng thử lại sau',
    //             );
    //           }
    //         });
    //     }
    //   }
    // } catch (error2) {
    //   console.log('err', error2);
    //   customAlert('Thông báo', 'Lỗi không xác định', null);
    // }
  };

  const checkOTP = () => {
    if (codeOTP) {
      const phone = formatPhone();
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeOTP);
      return firebase
        .auth()
        .signInWithCredential(credential)
        .then(async () => {
          const userLogin = await axiosClient.get('/gotruck/auth/user/' + phone);
          const orderList = await axiosClient.get('gotruck/order/user/' + userLogin._id);
          const currentLocation = await getLocationCurrentOfUser();
          if (currentLocation) {
            dispatch(SetLocation(currentLocation));
            dispatch(LoginSuccess(userLogin));
            dispatch(SetListOrder(orderList));
            toMainScreen();
          }
        })
        .catch((err) => {
          console.log(err?.code);
          if (err?.code === 'auth/invalid-verification-code') {
            Alert.alert('Thông báo', 'Mã OTP không chính xác');
          } else if (err?.code === 'auth/code-expired') {
            Alert.alert('Thông báo', 'Đã hết hạn nhập mã OTP\nVui lòng xác minh lại');
          } else {
            Alert.alert('Thông báo', 'Mã OTP không chính xác');
          }
        });
    }
  };

  const customAlert = (type, message, option) => {
    Alert.alert(type, message, [
      {
        text: 'Xác nhận',
        style: 'cancel',
      },
    ]);
  };

  const backScreen = () => {
    setScreen((prev) => prev - 1);
  };

  const nextScreen = () => {
    setValidData(false);
    setScreen((prev) => prev + 1);
  };

  const toMainScreen = () => {
    navigation.navigate('MainScreen');
  };

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      screen == 1 ? navigation.navigate('Welcome') : backScreen();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [screen]);
  //------------------------------
  return (
    <View style={styles.container}>
      {checkLogin ? (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          speed={1}
          loop={true}
        ></AnimatedLoader>
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            <Image
              source={require('../../assets/images/logo-name-white.png')}
              style={styles.logoName}
            />
            <Text style={styles.txtHeader}>Chào mừng bạn đã đến{'\n'}với GOTRUCK !!</Text>

            <Text style={styles.txtLabel}>{label[screen - 1]}</Text>
            {screen == 1 ? (
              <View style={styles.phone}>
                <View style={styles.phone.viewFlagVn}>
                  <Image
                    source={require('../../assets/images/flag-vn.jpg')}
                    style={styles.phone.flagVn}
                  />
                  <Text style={styles.phone.phoneVn}>+84</Text>
                </View>
                <MyInput
                  placeholder={'Số điện thoại'}
                  error={'Số điện thoại không hợp lệ'}
                  regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
                  width={230}
                  value={setPhone}
                  valid={setValidData}
                  screen={screen}
                />
              </View>
            ) : (
              <View style={styles.viewNormal}>
                <MyInput
                  placeholder={'Nhập mã OTP'}
                  error={'Mã OTP không hợp lệ'}
                  regex={/^[0-9]{6}$/g}
                  width={widthScreen - 60}
                  value={setcodeOTP}
                  valid={setValidData}
                  screen={screen}
                />
              </View>
            )}
          </ScrollView>
          <View style={styles.buttonFooter}>
            {validData ? (
              <MyButton
                type="large"
                text={screen == 2 ? 'Xác nhận' : 'Tiếp tục'}
                btnColor="black"
                txtColor="white"
                action={() => {
                  screen == 1 ? sendVerification() : screen == 2 ? checkOTP() : toMainScreen();
                  // alert error if invalid OTP
                }}
              />
            ) : (
              <MyButton
                type="large"
                text={screen == 2 ? 'Xác nhận' : 'Tiếp tục'}
                btnColor="grey"
                txtColor={stylesGlobal.darkGrey}
                disable={true}
              />
            )}
          </View>
          <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
        </>
      )}
    </View>
  );
}
