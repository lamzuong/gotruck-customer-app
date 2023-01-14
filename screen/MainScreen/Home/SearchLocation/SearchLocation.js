import styles from './stylesSearchLocation';
import stylesGlobal from '../../../../global/stylesGlobal';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState, useLayoutEffect, useContext } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../../context/AuthContext';

export default function DiaChiNhanHang() {
  const route = useRoute();
  const { noiLayHang, addressFrom, addressTo } = route.params;
  const navigation = useNavigation();
  const { locationNow } = useContext(AuthContext);

  const locationNowUser = {
    description: 'Vị trí hiện tại',
    geometry: {
      location: {
        lat: locationNow?.latitude,
        lng: locationNow?.longitude,
      },
    },
  };
  const DHCongNghiep = {
    description: '12 Nguyễn Văn Bảo, P.4, Q.Gò Vấp, TP.HCM',
    geometry: { location: { lat: 10.820685, lng: 106.687631 } },
    name: 'Nguyễn Văn A',
    phone: '0359224745',
  };
  const NhaSachCayGo = {
    description: '44/51 Lê Quang Sung, P.11, Q.6, TP.HCM',
    geometry: { location: { lat: 10.751087765680198, lng: 106.64291057824333 } },
    name: 'Nguyễn Văn B',
    phone: '0359434745',
  };
  const handleAddress = (data, details) => {
    //convert "Vi tri hien tai" to address
    if (data.description == locationNowUser.description) {
      data.description = locationNow.address;
    }
    let addressSelected = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: data.description,
    };
    //Neu la vi tri da luu thi them name, phone
    if (data.phone) {
      addressSelected.description = data.address;
      addressSelected.name = data.name;
      addressSelected.phone = data.phone;
    }
 
    if (noiLayHang) {
      if (addressTo)
        navigation.navigate('GoogleMap', {
          addressRecieve: addressSelected,
          addressDelivery: addressTo,
        });
      else
        navigation.navigate('NewOrder', {
          addressRecieve: addressSelected,
        });
    } else {
      if (addressFrom)
        navigation.navigate('GoogleMap', {
          addressRecieve: addressFrom,
          addressDelivery: addressSelected,
        });
      else
        navigation.navigate('NewOrder', {
          addressDelivery: addressSelected,
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={styles.iconBack}
          name="arrow-back"
          size={25}
          color={stylesGlobal.mainGreen}
          onPress={() => navigation.goBack()}
        />

        <GooglePlacesAutocomplete
          styles={{ textInput: styles.txtSearch, description: styles.txtResult }}
          placeholder={'Nhập địa chỉ nhận hàng'}
          enablePoweredByContainer={false}
          timeout={5000}
          fetchDetails
          onPress={(data, details = null) => {
            handleAddress(data, details);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_API_KEY,
            language: 'vn',
            components: 'country:vn',
          }}
          textInputProps={{
            autoFocus: true,
          }}
          predefinedPlaces={[locationNowUser, DHCongNghiep, NhaSachCayGo]}
        />
      </View>
      <ScrollView></ScrollView>
      <Pressable style={styles.buttonFooter} onPress={() => {}}>
        <Ionicons name="save" size={24} color={stylesGlobal.skyBlue} />
        <Text style={styles.txtFooter}>Chọn vị trí đã lưu</Text>
      </Pressable>
      <Pressable
        style={styles.buttonFooter}
        onPress={() => {
          navigation.navigate('SelectLocationOnMap', {
            noiLayHang: noiLayHang,
            addressFrom: addressFrom,
            addressTo: addressTo,
          });
        }}
      >
        <Ionicons name="location" size={24} color="red" />
        <Text style={styles.txtFooter}>Chọn từ bản đồ</Text>
      </Pressable>
    </View>
  );
}
