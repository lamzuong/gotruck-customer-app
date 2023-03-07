import styles from './stylesSelectSavedPlace';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, ScrollView, BackHandler, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';

export default function SavedPlace({ navigation }) {
  const [listAddress, setListAddress] = useState([]);

  const { user } = useContext(AuthContext);

  const route = useRoute();
  const { noiLayHang, addressTo, addressFrom } = route.params;

  const handleAddress = (addressSelected) => {
    if (noiLayHang) {
      if (addressTo) {
        if (addressTo.address == addressSelected.address) {
          Alert.alert('Thông báo', 'Vị trí nhận hàng trùng với vị trí giao hàng');
          return;
        }
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${addressSelected.address}&destination=${addressTo.address}&key=${GOOGLE_API_KEY}&mode=driving`;
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson.status);
            if (responseJson.status == 'OK')
              navigation.navigate('GoogleMap', {
                addressRecieve: addressSelected,
                addressDelivery: addressTo,
              });
            else if (responseJson.status == 'ZERO_RESULTS') {
              Alert.alert(
                'Thông báo',
                'Rất tiếc, Chúng tôi không thể vận chuyển từ "' +
                  addressSelected.address +
                  '" đến "' +
                  addressTo.address +
                  '"',
              );
              return;
            } else {
              // status == 'NOT_FOUND' or  status == 'REQUEST_DENIED'
              Alert.alert(
                'Thông báo',
                'Vui lòng kiểm tra lại vị trí nhận hàng và vị trí giao hàng',
              );
              return;
            }
          })
          .catch((e) => {
            console.warn(e);
            return;
          });
      } else {
        navigation.navigate('NewOrder', {
          addressRecieve: addressSelected,
        });
      }
    } else {
      if (addressFrom) {
        if (addressFrom.address == addressSelected.address) {
          Alert.alert('Thông báo', 'Vị trí nhận hàng trùng với vị trí giao hàng');
          return;
        }
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${addressFrom.address}&destination=${addressSelected.address}&key=${GOOGLE_API_KEY}&mode=driving`;
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == 'OK')
              navigation.navigate('GoogleMap', {
                addressRecieve: addressFrom,
                addressDelivery: addressSelected,
              });
            else if (responseJson.status == 'ZERO_RESULTS') {
              Alert.alert(
                'Thông báo',
                'Rất tiếc, Chúng tôi không thể vận chuyển từ "' +
                  addressFrom.address +
                  '" đến "' +
                  addressSelected.address +
                  '"',
              );
              return;
            } else {
              // status == 'NOT_FOUND' or  status == 'REQUEST_DENIED'
              Alert.alert(
                'Thông báo',
                'Vui lòng kiểm tra lại vị trí nhận hàng và vị trí giao hàng',
              );
              return;
            }
          })
          .catch((e) => {
            console.warn(e);
            return;
          });
      } else {
        navigation.navigate('NewOrder', {
          addressDelivery: addressSelected,
        });
      }
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
