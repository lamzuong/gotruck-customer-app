import styles from './stylesNewOrder';
import stylesGlobal from '../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../global/functionGlobal';
import truckTypes from '../data/truckTypes';
import goodsTypes from '../data/goodsTypes';
import MyButton from '../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';
import { GOOGLE_API_KEY } from '../../../../global/keyGG';

import { View, Text, Pressable, ScrollView, BackHandler } from 'react-native';
import { TextInput, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Foundation, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function NewOrder({ navigation }) {
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
  const [addressFrom, setAddressFrom] = useState();
  const [addressTo, setAddressTo] = useState();

  const [openTruck, setOpenTruck] = useState(false);
  const [valueTruck, setValueTruck] = useState(truckTypes[0].value);
  const [itemsTruck, setItemsTruck] = useState(truckTypes);

  const [openGoods, setOpenGoods] = useState(false);
  const [valueGoods, setValueGoods] = useState(goodsTypes[0].value);
  const [itemsGoods, setItemsGoods] = useState(goodsTypes);

  const [weight, setWeight] = useState('');
  const [images, setImages] = useState([
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    'https://ecdn.game4v.com/g4v-content/uploads/2020/05/Khoanh-khac-vi-dai-cua-Luffy-0-game4v.png',
    'https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg',
    // "https://i.pinimg.com/736x/36/f0/48/36f048323e3f06ddce7eb9ec301aaeb2.jpg",
    // "https://hosonhanvat.net/wp-content/uploads/2020/07/chopper-2.jpg",
    'https://genk.mediacdn.vn/2019/4/16/photo-1-1555407801845981270262.jpg',
    'https://genk.mediacdn.vn/2019/4/16/photo-1-1555407801845981270262.jpg',
    'https://upload.wikimedia.org/wikipedia/vi/f/f8/Nami_face.jpg',
  ]);

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [price, setPrice] = useState(1230100);
  const [currentLocation, setCurrentLocation] = useState();

  const route = useRoute();

  const mapRef = useRef();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  let INITIAL_POSITION = {
    latitude: 10.820685,
    longitude: 106.687631,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      let distanceTemp = args.distance.toFixed(1);
      let timeTemp = args.duration.toFixed(1);

      setDistance(distanceTemp);
      setTime(timeTemp);
    }
  };
  useLayoutEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      Geocoder.init(GOOGLE_API_KEY, {
        language: 'vn',
      });
      Geocoder.from({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
        .then((json) => {
          let currentLocationTemp = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: json.results[0].formatted_address,
          };
          console.log(currentLocationTemp);
          setCurrentLocation(currentLocationTemp);
          setAddressFrom(currentLocationTemp);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    })();
  }, []);

  useEffect(() => {
    if (route.params) {
      const { addressRecieve, addressDelivery } = route.params;
      if (addressRecieve != undefined) setAddressFrom(addressRecieve);
      if (addressDelivery != undefined) setAddressTo(addressDelivery);
    }
  }, [route]);

  const renderRowImage = (arr, listImages = [], column = 3) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          {arr.map((e, i) => (
            <View style={{ width: '36%' }} key={i}>
              <Image source={{ uri: e }} style={styles.itemImage} />
            </View>
          ))}
          {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length < column ? (
            <ButtonAdd action={() => {}} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length == column ? (
          <ButtonAdd action={() => {}} />
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Dùng để tính thời gian và khoảng cách  */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        <MapViewDirections
          origin={addressFrom}
          destination={addressTo}
          apikey={GOOGLE_API_KEY}
          onReady={traceRouteOnReady}
          onError={(e) => console.log(e)}
        />
      </MapView>

      {/* Nơi lấy hàng */}
      <View>
        <Text style={styles.label}>Nơi lấy hàng</Text>
        <Pressable
          style={[styles.input, styles.input.addition]}
          onPress={() => {
            navigation.navigate('SearchLocation', {
              noiLayHang: true,
              addressFrom: addressFrom,
              addressTo: addressTo,
              currentLocation: currentLocation,
            });
          }}
        >
          <View style={stylesGlobal.inline}>
            <Foundation name="record" size={24} color="#0DBEBE" style={{ width: 30 }} />
            {addressFrom ? (
              <View style={{ width: '85%' }}>
                <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
                  <Text style={styles.font18}>{addressFrom?.address}</Text>
                </ReadMore>
              </View>
            ) : (
              <Text style={{ fontSize: 18, fontStyle: 'italic' }}>Chưa có</Text>
            )}
          </View>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </Pressable>
      </View>
      {/* Giao tới */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Giao tới</Text>
        <Pressable
          style={[styles.input, styles.input.addition]}
          onPress={() => {
            navigation.navigate('SearchLocation', {
              noiLayHang: false,
              addressFrom: addressFrom,
              addressTo: addressTo,
              currentLocation: currentLocation,
            });
          }}
        >
          <View style={stylesGlobal.inline}>
            <Ionicons name="location-sharp" size={24} color="red" style={{ width: 30 }} />
            {addressTo ? (
              <View style={{ width: '85%' }}>
                <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
                  <Text style={styles.font18}>{addressTo?.address}</Text>
                </ReadMore>
              </View>
            ) : (
              <Text style={{ fontSize: 18, fontStyle: 'italic' }}>Chưa có</Text>
            )}
          </View>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </Pressable>
      </View>
      {/* Chọn loại xe */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Chọn loại xe</Text>
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <DropDownPicker
            open={openTruck}
            value={valueTruck}
            items={itemsTruck}
            setOpen={setOpenTruck}
            setValue={setValueTruck}
            setItems={setItemsTruck}
            labelStyle={styles.font18}
            textStyle={styles.font18}
            zIndex={10000}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
      </View>
      {/* Loại hàng hóa */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Loại hàng hóa</Text>
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <DropDownPicker
            open={openGoods}
            value={valueGoods}
            items={itemsGoods}
            setOpen={setOpenGoods}
            setValue={setValueGoods}
            setItems={setItemsGoods}
            labelStyle={{ fontSize: 18 }}
            textStyle={{ fontSize: 18 }}
            maxHeight={170}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
      </View>
      {/* Kích thước, tải trọng hàng hóa */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Cân nặng</Text>
        <View style={[styles.input, styles.input.addition]}>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={24}
            color="black"
            style={{ width: 30 }}
          />
          <Pressable style={{ flexDirection: 'row' }} onPress={() => {}}>
            <TextInput
              textAlign="right"
              style={[
                styles.font18,
                styles.font18.addition,
                {
                  fontStyle: weight.length == 0 ? 'italic' : 'normal',
                },
              ]}
              keyboardType={'number-pad'}
              onChangeText={(text) => setWeight(text)}
              value={weight}
              placeholder="VD: 1200"
            />
            <Text style={[styles.font18, { marginTop: 1 }]}>KG</Text>
          </Pressable>
        </View>
      </View>
      {/* Hình ảnh */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Hình ảnh hàng hóa</Text>
        {sliceIntoChunks(images, 3).map((e, i) => (
          <View key={i}>{renderRowImage(e, images, 3)}</View>
        ))}
      </View>
      {/* Thời gian, chi phí */}
      <View style={{ marginTop: 30 }}>
        <View style={stylesGlobal.inlineBetween}>
          <Text style={styles.font18}>Khoảng cách</Text>
          <Text style={styles.font18}>{distance} km</Text>
        </View>
        <View style={[stylesGlobal.inlineBetween, { marginTop: 8 }]}>
          <Text style={styles.font18}>Thời gian dự kiến</Text>
          <Text style={styles.font18}>{time} phút</Text>
        </View>
        <View style={[stylesGlobal.inlineBetween, { marginTop: 8 }]}>
          <Text style={styles.font18}>Phí vận chuyển</Text>
          <Text style={styles.price}>
            {price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
          </Text>
        </View>
      </View>
      {/* Button */}
      <View style={{ marginTop: 10, marginBottom: 50 }}>
        <MyButton
          text={'Tiếp theo'}
          type="large"
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          action={() => {
            navigation.navigate('NewOrderDetail', {
              item: {
                addressFrom: addressFrom?.address,
                addressTo: addressTo?.address,
                truckType: valueTruck,
                goodType: valueGoods,
                weight,
                images,
                time,
                price,
              },
            });
          }}
        />
      </View>
    </ScrollView>
  );
}
