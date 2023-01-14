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
import React, { useState, useLayoutEffect, useContext } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLE_API_KEY } from '../../../../../global/keyGG';
import { AuthContext } from '../../../../../context/AuthContext';

export default function DiaChiNhanHang() {
  const navigation = useNavigation();
  const { locationNow } = useContext(AuthContext);
  const route = useRoute();

  const locationNowUser = {
    description: 'Vị trí hiện tại',
    geometry: {
      location: {
        lat: locationNow?.latitude,
        lng: locationNow?.longitude,
      },
    },
  };

  const handleAddress = (data, details) => {
    if (data.description == locationNowUser.description) {
      data.description = locationNow.address;
    }
    let addressSelected = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: data.description,
    };
    if (route.params != undefined) {
      navigation.navigate('FormSavedPlace', {
        addressSelected: addressSelected,
        item: route.params.item,
      });
    } else
      navigation.navigate('FormSavedPlace', {
        addressSelected: addressSelected,
      });
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
          textInputProps={{
            autoFocus: true,
          }}
          predefinedPlaces={[locationNowUser]}
        />
      </View>
      <Pressable
        style={styles.buttonFooter}
        onPress={() => {
          if (route.params != undefined) {
            navigation.navigate('GoogleMapSavedPlace', { item: route.params.item });
          } else navigation.navigate('GoogleMapSavedPlace');
        }}
      >
        <Ionicons name="location" size={24} color="red" />
        <Text style={styles.txtFooter}>Chọn từ bản đồ</Text>
      </Pressable>
    </View>
  );
}
