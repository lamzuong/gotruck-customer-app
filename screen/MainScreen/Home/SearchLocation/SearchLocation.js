import styles from './stylesSearchLocation';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../../context/AuthContext';

export default function DiaChiNhanHang() {
  const navigation = useNavigation();

  const { locationNow } = useContext(AuthContext);

  const route = useRoute();
  const { noiLayHang, addressFrom, addressTo } = route.params;

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
      addressSelected.name = data.name;
      addressSelected.phone = data.phone;
    }
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
      } else
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
            language: 'vi',
            components: 'country:vn',
          }}
          textInputProps={{
            autoFocus: true,
          }}
          predefinedPlaces={[locationNowUser]}
        />
      </View>
      <ScrollView></ScrollView>
      <Pressable
        style={styles.buttonFooter}
        onPress={() => {
          navigation.navigate('SelectSavedPlace', {
            noiLayHang: noiLayHang,
            addressFrom: addressFrom,
            addressTo: addressTo,
          });
        }}
      >
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
