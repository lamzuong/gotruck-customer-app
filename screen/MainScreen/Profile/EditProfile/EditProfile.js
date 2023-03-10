import styles from './stylesEditProfile';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../components/MyButton/MyButton';

import {
  View,
  Text,
  BackHandler,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';

import { LoginSuccess, LoginStart, LoginFailure } from '../../../../context/AuthAction';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../../config';
import firebase from 'firebase/compat';

import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
const widthScreen = Dimensions.get('window').width;
export default function EditProfile({ navigation }) {
  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------
  const scrollViewRef = useRef();

  const { user, dispatch } = useContext(AuthContext);

  const nameInit = user.name;
  const phoneInit = user.phone;
  const imageuserInit = user.avatar;

  const [name, setName] = useState(nameInit);
  const [validName, setValidName] = useState(true);
  const [phone, setPhone] = useState(phoneInit);

  const [validPhone, setValidPhone] = useState(true);

  const [codeOTP, setCodeOTP] = useState();
  const [validCodeOTP, setValidCodeOTP] = useState(true);

  const [screen, setScreen] = useState(1);
  const [verificationId, setVerificationId] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [imageUserNow, setImageUserNow] = useState({ uri: imageuserInit });

  const recaptchaVerifier = useRef(null);
  const checkValid = () => validName && validPhone;
  const checkChange = () => {
    if (checkValid()) {
      return name != nameInit || phone != phoneInit || imageUserNow.uri != user.avatar;
    }
    return false;
  };

  const sendVerification = async () => {
    try {
      const res = await axiosClient.get('/gotruck/auth/user/' + phone);
      if (res.phone) {
        customAlert('Th??ng b??o', 'S??? ??i???n tho???i n??y ???? ???????c s??? d???ng!', null);
      } else {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
          .verifyPhoneNumber('+84' + phone, recaptchaVerifier.current)
          .then((result) => {
            // customAlert('Th??ng b??o', 'Ch??ng t??i ???? g???i m?? OTP v??? s??? ??i???n tho???i c???a b???n', null);
            setVerificationId(result);
            nextScreen();
          })
          .catch((error) => {
            console.log(error);
            // customAlert('Th??ng b??o', 'L???i kh??ng x??c ?????nh', null);
          });
      }
    } catch (error) {
      customAlert('Th??ng b??o', 'L???i kh??ng x??c ?????nh', null);
    }
  };

  const updateProfile1 = async () => {
    
    if (phone != phoneInit) {
      Alert.alert(
        'X??c nh???n',
        'B???n ch???c ch???n ?????i s??? ??i???n tho???i kh??ng?\nN???u c??, s??? ??i???n tho???i n??y s??? ???????c s??? d???ng ????? ????ng nh???p thay cho s??? ??i???n tho???i hi???n t???i',
        [
          {
            text: 'H???y',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'OK', onPress: () => sendVerification() },
        ],
      );
    } else {
      if (imageUserNow.uri != user.avatar) {
       
        uploadFirebaseAndFinishEditProfile(imageUserNow, false);
      } else {
       
        user.name = name;
        await axiosClient.put('/gotruck/auth/user', {
          ...user,
        });
        dispatch(LoginSuccess(user));
        navigation.goBack();
      }
    }
  };

  const updateProfile2 = async () => {
    if (codeOTP) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, codeOTP);
      return firebase
        .auth()
        .signInWithCredential(credential)
        .then(async () => {
          if (imageUserNow.uri != user.avatar) {
            uploadFirebaseAndFinishEditProfile(imageUserNow, true);
          } else {
            user.phone = phone;
            user.name = name;
            await axiosClient.put('/gotruck/auth/user/' + phoneInit, {
              ...user,
            });

            dispatch(LoginSuccess(user));
            navigation.goBack();
          }
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Th??ng b??o', 'M?? OTP kh??ng ch??nh x??c');
        });
    }
  };

  const customAlert = (type, message, option) => {
    Alert.alert(type, message, [
      {
        text: 'X??c nh???n',
        style: 'cancel',
      },
    ]);
  };

  const backScreen = () => {
    setScreen((prev) => prev - 1);
  };
  const nextScreen = () => {
    setCodeOTP(false);
    setScreen((prev) => prev + 1);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Th??ng b??o', 'B???n ???? t??? ch???i c???p quy???n truy c???p m??y ???nh', [
        {
          text: 'H???y',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'M??? c??i ?????t', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      setImageUserNow(result.assets[0]);
    }
  };
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Th??ng b??o', 'B???n ???? t??? ch???i c???p quy???n truy c???p kho ???nh', [
        {
          text: 'H???y',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'M??? c??i ?????t', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImageUserNow(result.assets[0]);
    } else {
      console.log('l???i UpdateProfile');
    }
  };

  const uploadFirebaseAndFinishEditProfile = async (imageUpload, phoneChange) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUpload.uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();
    snapshot.ref.getDownloadURL().then(async function (downloadURL) {
      if (phoneChange) {
        user.avatar = downloadURL;
        user.phone = phone;
        user.name = name;
        await axiosClient.put('/gotruck/auth/user/' + phoneInit, {
          ...user,
        });
      } else {
        user.avatar = downloadURL;
        user.name = name;
        await axiosClient.put('/gotruck/auth/user', {
          ...user,
        });
      }
      dispatch(LoginSuccess(user));
      navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  showImagePicker();
                  setModalVisible(!modalVisible);
                }}
              >
                <View styles={{ width: '100%' }}>
                  <FontAwesome
                    name="image"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View styles={{ width: '100%' }}>
                  <Text style={styles.chupanh}>Ch???n ???nh t??? th?? vi???n</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  openCamera();
                  setModalVisible(!modalVisible);
                }}
              >
                <View styles={{ width: '100%' }}>
                  <AntDesign
                    name="camera"
                    size={25}
                    color="black"
                    style={{ margin: 10, marginTop: 12 }}
                  />
                </View>
                <View>
                  <Text style={styles.chupanh}>Ch???p ???nh</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={styles.header}>
          <Ionicons
            style={styles.iconBack}
            name="arrow-back"
            size={40}
            color={'white'}
            onPress={() => (screen == 1 ? navigation.goBack() : backScreen())}
          />
          <Image
            source={require('../../../../assets/images/anh-bia-truck.png')}
            style={styles.coverImage}
          />
          {screen == 1 && (
            <TouchableOpacity style={styles.viewAvatar} onPress={() => setModalVisible(true)}>
              <Image
                source={{
                  uri: imageUserNow.uri,
                }}
                style={styles.avatar}
              />
              <AntDesign name="camera" size={24} color="black" style={styles.camera} />
            </TouchableOpacity>
          )}
        </View>

        {screen == 1 ? (
          <>
            <View style={styles.viewInput}>
              <Text style={styles.label}>H??? t??n</Text>
              <MyInput
                borderWidth={1}
                initialValue={nameInit}
                value={setName}
                valid={setValidName}
                regex={/^[a-zA-Z ]{1,30}$/}
                inputName={true}
                error={'H??? t??n kh??ng h???p l???'}
              />
            </View>

            <View style={styles.viewInput}>
              <Text style={styles.label}>S??? ??i???n tho???i</Text>
              <View style={stylesGlobal.inlineBetween}>
                <View style={stylesGlobal.inline}>
                  <Image
                    source={require('../../../../assets/images/flag-vn.jpg')}
                    style={styles.flagVn}
                  />
                  <Text style={{ fontSize: 18, marginLeft: 5 }}>+84</Text>
                </View>
                <MyInput
                  borderWidth={1}
                  width={widthScreen - 140}
                  initialValue={phoneInit}
                  value={setPhone}
                  valid={setValidPhone}
                  regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
                  error={'S??? ??i???n tho???i kh??ng h???p l???'}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.screenOTP}>
            <View style={styles.viewInput}>
              <Text style={styles.label}>Nh???p m?? OTP</Text>
              <MyInput
                borderWidth={1}
                placeholder={'Nh???p m?? OTP'}
                error={'M?? OTP kh??ng h???p l???'}
                regex={/^[0-9]{6}$/g}
                width={widthScreen - 60}
                value={setCodeOTP}
                valid={setValidCodeOTP}
                //  screen={screen}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {screen == 2 ? (
          validCodeOTP ? (
            <MyButton
              type={'large'}
              btnColor={stylesGlobal.mainGreen}
              txtColor={'white'}
              text="Ti???p t???c"
              action={() => updateProfile2()}
            />
          ) : (
            <MyButton
              type={'large'}
              btnColor={stylesGlobal.lightGreen}
              txtColor={'white'}
              text="Ti???p t???c"
              disable={true}
            />
          )
        ) : checkChange() ? (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            text="L??u th??ng tin"
            action={() => updateProfile1()}
          />
        ) : (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.lightGreen}
            txtColor={'white'}
            text="L??u th??ng tin"
            disable={true}
          />
        )}
      </View>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
    </View>
  );
}
