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
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';

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

  const nameInit = 'Nico Robin';
  const phoneInit = '794861181';

  const [name, setName] = useState(nameInit);
  const [validName, setValidName] = useState(true);
  const [phone, setPhone] = useState(phoneInit);
  const [validPhone, setValidPhone] = useState(true);

  const checkValid = () => validName && validPhone;
  const checkChange = () => {
    if (checkValid()) {
      return name != nameInit || phone != phoneInit;
    }
    return false;
  };
  return (
    <View style={styles.container}>
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
            onPress={() => navigation.goBack()}
          />
          <Image
            source={require('../../../../assets/images/anh-bia-truck.png')}
            style={styles.coverImage}
          />
          <TouchableOpacity style={styles.viewAvatar}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkpJs8hpgL9n4IJmmmyrhmNXPcv1-5TDIGEjVCy7DK7DpHCxvg2vipiuf5Kd290BcXDOM&usqp=CAU',
              }}
              style={styles.avatar}
            />
            <AntDesign name="camera" size={24} color="black" style={styles.camera} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Họ tên</Text>
          <MyInput
            borderWidth={1}
            initialValue={nameInit}
            value={setName}
            valid={setValidName}
            regex={/^[a-zA-Z ]{1,30}$/}
            inputName={true}
            error={'Họ tên không hợp lệ'}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Số điện thoại</Text>
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
              error={'Số điện thoại không hợp lệ'}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {checkChange() ? (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            text="Lưu thông tin"
          />
        ) : (
          <MyButton
            type={'large'}
            btnColor={stylesGlobal.lightGreen}
            txtColor={'white'}
            text="Lưu thông tin"
            disable={true}
          />
        )}
      </View>
    </View>
  );
}
