import styles from './stylesSelectSavedPlace';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, ScrollView, BackHandler, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { getRouteTwoLocation } from '../../../../global/utilLocation';

export default function SavedPlace({ navigation }) {
  const [listAddress, setListAddress] = useState([]);

  const { user } = useContext(AuthContext);

  const route = useRoute();
  const { noiLayHang, addressTo, addressFrom } = route.params;

  const handleAddress = async (addressSelected) => {
    if (noiLayHang) {
      if (addressTo) {
        if (addressTo.address === addressSelected.address) {
          Alert.alert('Thông báo', 'Vị trí nhận hàng trùng với vị trí giao hàng');
          return;
        }
        const resultRoute = await getRouteTwoLocation(addressSelected, addressTo);
        if (resultRoute) {
          navigation.navigate('GoogleMap', {
            addressRecieve: addressSelected,
            addressDelivery: addressTo,
          });
        } else {
          Alert.alert(
            'Thông báo',
            'Rất tiếc, Chúng tôi không thể vận chuyển từ "' +
              addressSelected.address +
              '" đến "' +
              addressTo.address +
              '"',
          );
          return;
        }
      } else
        navigation.navigate('NewOrder', {
          addressRecieve: addressSelected,
        });
    } else {
      if (addressFrom) {
        if (addressFrom.address == addressSelected.address) {
          Alert.alert('Thông báo', 'Vị trí nhận hàng trùng với vị trí giao hàng');
          return;
        }
        const resultRoute = await getRouteTwoLocation(addressFrom, addressSelected);
        if (resultRoute) {
          navigation.navigate('GoogleMap', {
            addressRecieve: addressFrom,
            addressDelivery: addressSelected,
          });
        } else {
          Alert.alert(
            'Thông báo',
            'Rất tiếc, Chúng tôi không thể vận chuyển từ "' +
              addressFrom.address +
              '" đến "' +
              addressSelected.address +
              '"',
          );
          return;
        }
      } else
        navigation.navigate('NewOrder', {
          addressDelivery: addressSelected,
        });
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    (async function () {
      const listsaved = await axiosClient.get('/gotruck/profile/savedplace/' + user._id);
      if (listsaved.length > 0) setListAddress(listsaved);
      else setListAddress([]);
    }.call(this));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {listAddress.length != 0 ? (
        <>
          {listAddress.map((item, i) => (
            <View style={styles.container} key={i}>
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
              <View style={[stylesGlobal.inlineBetween, styles.centerButton]}>
                <TouchableOpacity style={styles.btnTiepTuc} onPress={() => handleAddress(item)}>
                  <Text style={styles.txtTiepTuc}>Tiếp tục</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.viewNoContent}>
          <Text style={styles.noContent}>Không có vị trí đã lưu</Text>
        </View>
      )}
    </ScrollView>
  );
}
