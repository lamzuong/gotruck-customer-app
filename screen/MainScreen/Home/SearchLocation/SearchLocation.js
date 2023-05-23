import styles from './stylesSearchLocation';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, ScrollView, Pressable, Alert, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../../context/AuthContext';
import { getRouteTwoLocation, getAddressFromText } from '../../../../global/utilLocation';
import MyInput from '../../../../components/MyInput/MyInput';

export default function DiaChiNhanHang() {
  const [keyword, setKeyword] = useState('');
  const [listResultAddress, setListResultAddress] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const { locationNow } = useContext(AuthContext);
  const route = useRoute();
  const { noiLayHang, addressFrom, addressTo } = route.params;

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
          name="arrow-back"
          size={25}
          color={stylesGlobal.mainGreen}
          onPress={() => navigation.goBack()}
          style={{ left: -10 }}
        />

        <MyInput
          placeholder={'Nhập địa chỉ '}
          value={setKeyword}
          borderWidth={1}
          borderColor={stylesGlobal.darkGrey}
        />

        {/* <GooglePlacesAutocomplete
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
        /> */}
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
