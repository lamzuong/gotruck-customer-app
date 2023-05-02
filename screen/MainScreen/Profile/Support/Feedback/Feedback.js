import styles from './stylesFeedback';
import stylesGlobal from '../../../../../global/stylesGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../../components/ButtonAdd/ButtonAdd';

import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { AuthContext } from '../../../../../context/AuthContext';
import axiosClient from '../../../../../api/axiosClient';
import { sliceIntoChunks } from '../../../../../global/functionGlobal';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../../../../config';
import firebase from 'firebase/compat';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AnimatedLoader from 'react-native-animated-loader';

import * as ImagePicker from 'expo-image-picker';

export default function Feedback({ navigation }) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
 
  const [listImage, setListImage] = useState([]);

  const [listImageSend, setListImageSend] = useState([]);

  // const [validEmail, setValidEmail] = useState(false);
  // const [validPhone, setValidPhone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkUpload, setCheckUpload] = useState(false);

  const { user } = useContext(AuthContext);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập máy ảnh', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
      ]);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      setListImage([...listImage, result.assets[0].uri]);
      setListImageSend([...listImageSend, result.assets[0]]);
    }
  };
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập kho ảnh', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
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
      setListImage([...listImage, result.assets[0].uri]);
      setListImageSend([...listImageSend, result.assets[0]]);
    } else {
      console.log('lỗi FeedBack');
    }
  };

  const handleFeedback = async () => {
    if (subject.trim().length != 0 && description.trim().length != 0 ) {
      let listURLImage = [];
      setCheckUpload(true);
      for (let i = 0; i < listImageSend.length; i++) {
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
          xhr.open('GET', listImageSend[i].uri, true);
          xhr.send(null);
        });

        const ref = firebase.storage().ref().child(uuid.v4());
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();
        const temp = await snapshot.ref.getDownloadURL();
        listURLImage.push(temp);
      }
      await axiosClient.post('gotruck/profile/feedback', {
        subject,
        description,
        list_image: listURLImage,
        id_sender: user._id,
        status: 'Đã gửi',
      });
      setCheckUpload(false);
      navigation.goBack();
    } else {
      Alert.alert('Thông báo', 'Chủ đề và mô tả không được để trống');
    }
  };

  const removeImage = (uri) => {
    const newListImage = listImage;
    const newListImageSend = listImageSend;

    const index = listImage.indexOf(uri);
    if (index > -1) {
      newListImage.splice(index, 1);
      newListImageSend.splice(index, 1);
    }
    setListImage([...newListImage]);
    setListImageSend([...newListImageSend]);
  };

  const renderRowImage = (arr, listImages = [], column = 3) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          {arr.map((e, i) => (
            <View style={{ width: '36%' }} key={i}>
              <Image source={{ uri: e }} style={styles.itemImage} />
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => {
                  removeImage(e);
                }}
              >
                <Image
                  source={require('../../../../../assets/images/close.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </View>
          ))}
          {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length < column ? (
            <ButtonAdd action={() => setModalVisible(true)} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length == column ? (
          <ButtonAdd action={() => setModalVisible(true)} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {checkUpload ? (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          speed={1}
          loop={true}
        ></AnimatedLoader>
      ) : (
        <>
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
                      <Text style={styles.chupanh}>Chọn ảnh từ thư viện</Text>
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
                      <Text style={styles.chupanh}>Chụp ảnh</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewInput}>
              <Text style={styles.label}>Chủ đề</Text>
              <MyInput
                borderWidth={1}
                initialValue=""
                placeholder={'VD: Đơn hàng, tài xế, ...'}
                value={setSubject}
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.label}>Mô tả</Text>
              <MyInput
                borderWidth={1}
                placeholder={'Nêu rõ sự việc'}
                height={100}
                clear={false}
                value={setDescription}
                multiline={true}
                numberOfLines={99}
                initialValue=""
              />
            </View>
            {/* <View style={styles.viewInput}>
              <Text style={styles.label}>Email liên lạc</Text>
              <MyInput
                borderWidth={1}
                error={'Email không hợp lệ'}
                regex={/^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/}
                placeholder={'VD: abc@gmail.com'}
                value={setEmail}
                valid={setValidEmail}
                initialValue="a@gmail.com"
              />
            </View>
            <View style={styles.viewInput}>
              <Text style={styles.label}>Số điện thoại liên lạc</Text>
              <MyInput
                borderWidth={1}
                error={'Số điện thoại không hợp lệ'}
                regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
                placeholder={'VD: 0901234567'}
                value={setPhone}
                valid={setValidPhone}
                initialValue="0359434722"
              />
            </View> */}
            <View style={styles.viewInput}>
              <Text style={styles.label}>Hình ảnh minh chứng đính kèm (nếu có)</Text>
              {listImage.length != 0 ? (
                <>
                  {sliceIntoChunks(listImage, 3).map((e, i) => (
                    <View key={i}>{renderRowImage(e, listImage, 3)}</View>
                  ))}
                </>
              ) : (
                <ButtonAdd action={() => setModalVisible(true)} />
              )}
            </View>
          </ScrollView>
          <View style={{ alignItems: 'center' }}>
            <MyButton
              type={'large'}
              text={'Gửi đơn'}
              btnColor={stylesGlobal.mainGreen}
              txtColor={'white'}
              action={() => handleFeedback()}
            />
          </View>
        </>
      )}
    </View>
  );
}
