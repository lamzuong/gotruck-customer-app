import styles from './stylesFormSavedPlace';
import stylesGlobal from '../../../../../global/stylesGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';

import { View, Text, ScrollView, Pressable, BackHandler, Alert } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReadMore from 'react-native-read-more-text';
import { useRoute } from '@react-navigation/native';

export default function FormSavedPlace({ navigation }) {
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
  const route = useRoute();
  const { addressSelected, item } = route.params;

  const [address, setAddress] = useState(item?.address);
  const [name, setName] = useState(item?.name);
  const [phone, setPhone] = useState(item?.phone);
  const [validName, setValidName] = useState(item ? true : false);
  const [validPhone, setValidPhone] = useState(item ? true : false);

  useLayoutEffect(() => {
    if (addressSelected != undefined) {
      setAddress(addressSelected.address);
    }
  }, [route]);

  const handleLuuDiaChi = () => {
    if (validName && validPhone) {
      let infoSavePlace;
      if (addressSelected) {
        infoSavePlace = {
          address: addressSelected.address,
          latitude: addressSelected.latitude,
          longitude: addressSelected.longitude,
          name: name,
          phone: phone,
          id: item ? item.id : -1,
        };
      } else {
        infoSavePlace = {
          address: item.address,
          latitude: item.latitude,
          longitude: item.longitude,
          name: name,
          phone: phone,
          id: item ? item.id : -1,
        };
      }

      //Update nếu infoSavePlace.id >=0 ngược lại create 
      //navigation bỏ param vì sẽ gọi api ở savedPlace để lấy dữ liệu mới nhất

      navigation.navigate('SavedPlace', {
        infoSavePlace: infoSavePlace,
      });
    } else {
      Alert.alert('Thông báo', 'Thông tin không hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.componentInput}>
          <Text style={styles.label}>Địa chỉ</Text>
          <Pressable
            style={styles.input}
            onPress={() => {
              navigation.navigate('SearchLocationSavedPlace', { item: item });
            }}
          >
            <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
              <Text style={{ fontSize: 18 }}>{address}</Text>
            </ReadMore>
          </Pressable>
        </View>
        <View style={styles.componentInput}>
          <Text style={styles.label}>Họ tên</Text>
          <View style={{ marginTop: 10 }}>
            <MyInput
              placeholder={'Họ tên'}
              borderWidth={1}
              value={setName}
              initialValue={name}
              valid={setValidName}
              regex={/^[a-zA-Z ]{1,30}$/}
              error={'Tên không hợp lệ'}
              styleError={styles.error}
              inputName={true}
            />
          </View>
        </View>
        <View style={styles.componentInput}>
          <Text style={styles.label}>Số điện thoại</Text>
          <View style={{ marginTop: 10 }}>
            <MyInput
              placeholder={'Số điện thoại'}
              borderWidth={1}
              value={setPhone}
              initialValue={phone}
              valid={setValidPhone}
              regex={/^((09|03|07|08|05)([0-9]{8}))$/g}
              error={'Số điện thoại không hợp lệ'}
              styleError={styles.error}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <MyButton
          type={'large'}
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          text={'Lưu địa chỉ'}
          action={() => handleLuuDiaChi()}
        />
      </View>
    </View>
  );
}
