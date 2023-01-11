import styles from './stylesSearchLocationSavedPlace';
import stylesGlobal from '../../../../../global/stylesGlobal';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLE_API_KEY } from '../../../../../global/keyGG';

export default function DiaChiNhanHang() {
  const [viTriHienTai, setViTriHienTai] = useState();
  const navigation = useNavigation();

  const currentLocationUser = {
    description: 'Vị trí hiện tại',
    geometry: {
      location: { lat: viTriHienTai?.latitude, lng: viTriHienTai?.longitude },
    },
  };

  const DHCongNghiep = {
    description: 'Trường Đại học Công nghiệp TPHCM',
    geometry: { location: { lat: 10.820685, lng: 106.687631 } },
  };

  const handleAddress = (data, details) => {
    let addressSelected = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: data.description,
    };
    navigation.navigate('FormSavedPlace', { addressSelected: addressSelected });
  };

  useLayoutEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let addressTemp = '';
      Geocoder.init(GOOGLE_API_KEY, {
        language: 'vn',
      });
      Geocoder.from({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
        .then((json) => {
          addressTemp = json.results[0].formatted_address;

          let currentLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: addressTemp,
          };

          setViTriHienTai(currentLocation);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

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
          placeholder={'Nhập địa chỉ cần lưu'}
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
          predefinedPlaces={viTriHienTai ? [currentLocationUser, DHCongNghiep] : []}
        />
      </View>
      <Pressable
        style={styles.buttonFooter}
        onPress={() => {
          navigation.navigate('GoogleMapSavedPlace');
        }}
      >
        <Ionicons name="location" size={24} color="red" />
        <Text style={styles.txtFooter}>Chọn từ bản đồ</Text>
      </Pressable>
    </View>
  );
}
