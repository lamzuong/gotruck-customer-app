import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';
import stylesGlobal from '../../global/stylesGlobal';
import styles from './stylesSignUp';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Dimensions, Image, ScrollView, Text, View } from 'react-native';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat';
import { firebaseConfig } from '../../config';

import axiosClient from '../../api/axiosClient';
import { LoginSuccess, SetLocation } from '../../context/AuthAction';
import { AuthContext } from '../../context/AuthContext';
import { getLocationCurrentOfUser } from '../../global/utilLocation';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const label = [
  'Vui lòng nhập số điện thoại để tiếp tục',
  'Nhập mã OTP để tiếp tục',
  'Nhập họ tên để hoàn tất đăng ký !!',
];

export default function SignUp({ navigation }) {
  const [screen, setScreen] = useState(1);
  const [validData, setValidData] = useState(false);
  const [codeOTP, setCodeOTP] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [verificationId, setVerificationId] = useState();

  const { dispatch, user } = useContext(AuthContext);

  const scrollViewRef = useRef();
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    try {
      const res = await axiosClient.get('/gotruck/auth/user/' + phoneNumber);
      if (res.phone) {
        customAlert('Thông báo', 'Số điện thoại này đã được đăng kí!', null);
      } else {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber('+84' + phoneNumber, recaptchaVerifier.current)
          .then((result) => {
            customAlert('Thông báo', 'Chúng tôi đã gửi mã OTP về số điện thoại của bạn', null);
            setVerificationId(result);
            nextScreen();
          })
          .catch((error) => {
            console.log(error);
            // customAlert('Thông báo', 'Lỗi không xác định', null);
          });
      }
    } catch (error) {
      customAlert('Thông báo', 'Lỗi không xác định', null);
    }
  };

  const checkOTP = () => {
    if (codeOTP) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeOTP);
      return firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          nextScreen();
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Thông báo', 'Mã OTP không chính xác');
        });
    }
  };

  const saveUser = async () => {
    try {
      await axiosClient.post('/gotruck/auth/register', {
        phone: phoneNumber,
        name: nameUser,
      });
      nextScreen();
    } catch (error) {
      customAlert('Thông báo', 'Lỗi không xác định', null);
    }
  };

  const backScreen = () => {
    setScreen((prev) => prev - 1);
  };
  const nextScreen = () => {
    setValidData(false);
    setScreen((prev) => prev + 1);
  };
  const finishSignUp = async () => {
    const userLogin = await axiosClient.get('/gotruck/auth/user/' + phoneNumber);
    const currentLocation = await getLocationCurrentOfUser();
    if (currentLocation) {
      dispatch(SetLocation(currentLocation));
      dispatch(LoginSuccess(userLogin));
      navigation.navigate('MainScreen');
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
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <Image
          source={require('../../assets/images/logo-name-white.png')}
          style={styles.logoName}
        />
        {screen < 4 ? (
          <>
            <Text style={styles.txtHeader}>Chào mừng bạn đã đến{'\n'}với GOTRUCK !!</Text>
            <Text style={styles.txtLabel}>{label[screen - 1]}</Text>
          </>
        ) : (
          <Text style={styles.txtHeader}>Chúc mừng bạn đã đăng ký {'\n'}thành công !!</Text>
        )}

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
              initialValue={'0359434723'}
              error={'Số điện thoại không hợp lệ'}
              regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
              width={230}
              value={setPhoneNumber}
              valid={setValidData}
              screen={screen}
            />
          </View>
        ) : screen == 2 ? (
          <View style={styles.viewNormal}>
            <MyInput
              placeholder={'Nhập mã OTP'}
              error={'Mã OTP không hợp lệ'}
              regex={/^[0-9]{6}$/g}
              width={widthScreen - 60}
              value={setCodeOTP}
              valid={setValidData}
              screen={screen}
            />
          </View>
        ) : screen == 3 ? (
          <View style={styles.viewNormal}>
            <MyInput
              placeholder={'Nhập họ tên đầy đủ'}
              error={'Họ tên không hợp lệ'}
              regex={/^[a-zA-Z ]{1,30}$/}
              width={widthScreen - 60}
              value={setNameUser}
              valid={setValidData}
              inputName={true}
              screen={screen}
            />
          </View>
        ) : (
          <View style={styles.viewFinish}>
            <Text style={styles.viewFinish.title}>
              Hãy bắt đầu những đơn hàng đầu tiên nào{'\t\t'}
              <MaterialCommunityIcons name="truck-fast" size={25} color="white" />
            </Text>
            <Image
              source={require('../../assets/images/logo-truck.png')}
              style={styles.viewFinish.logoTruck}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonFooter}>
        {validData || screen == 4 ? (
          <MyButton
            type="large"
            text={screen == 4 ? 'Tiếp tục' : 'Tiếp tục'}
            btnColor="black"
            txtColor="white"
            action={() => {
              screen == 1
                ? sendVerification()
                : screen == 2
                ? checkOTP()
                : screen == 3
                ? saveUser()
                : screen == 4
                ? finishSignUp()
                : null;
            }}
          />
        ) : (
          <MyButton
            type="large"
            text="Tiếp tục"
            btnColor="grey"
            txtColor={stylesGlobal.darkGrey}
            disable={true}
          />
        )}
      </View>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
    </View>
  );
}
