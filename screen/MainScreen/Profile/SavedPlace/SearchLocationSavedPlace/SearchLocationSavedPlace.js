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
import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLE_API_KEY } from '../../../../../global/keyGG';
import { AuthContext } from '../../../../../context/AuthContext';
import MyInput from '../../../../../components/MyInput/MyInput';
import { getAddressFromText } from '../../../../../global/utilLocation';

export default function DiaChiNhanHang() {
  const [keyword, setKeyword] = useState('');
  const [listResultAddress, setListResultAddress] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const { locationNow } = useContext(AuthContext);
  const route = useRoute();

  const locationNowUser = {
    address: 'Vị trí hiện tại',
    location: {
      lat: locationNow?.latitude,
      lng: locationNow?.longitude,
    },
  };

  const handleAddress = async (address) => {
    let addressSelected = {
      latitude: address.location.lat || 0,
      longitude: address.location.lng || 0,
      address: address.address === 'Vị trí hiện tại' ? locationNow.address : address.address,
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

  useEffect(() => {
    setLoader(true);
    const delayFC = setTimeout(async () => {
      if (keyword) {
        const resultAddress = await getAddressFromText(keyword);
        if (resultAddress) {
          setListResultAddress(resultAddress);
        } else {
          setListResultAddress([]);
        }
      } else {
        setListResultAddress([]);
      }
      setLoader(false);
    }, 1000);
    return () => clearTimeout(delayFC);
  }, [keyword]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={{ left: -10 }}
          name="arrow-back"
          size={25}
          color={stylesGlobal.mainGreen}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <MyInput
          placeholder={'Nhập địa chỉ '}
          value={setKeyword}
          borderWidth={1}
          borderColor={stylesGlobal.darkGrey}
        />
      </View>
      <View style={styles.listAddress}>
        {keyword && listResultAddress?.length > 0 ? (
          <>
            {listResultAddress?.map((e, i) => (
              <View key={i} style={styles.itemAddress}>
                <TouchableOpacity
                  onPress={() => {
                    handleAddress(e);
                  }}
                >
                  <Text style={styles.address}>{e.address}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : keyword && listResultAddress?.length === 0 && !loader ? (
          <View style={styles.itemAddress}>
            <Text style={styles.address}>Không tìm thấy</Text>
          </View>
        ) : (
          <View style={styles.itemAddress}>
            <TouchableOpacity
              onPress={() => {
                handleAddress(locationNowUser);
              }}
            >
              <Text style={styles.address}>{locationNowUser.address}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView></ScrollView>
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
