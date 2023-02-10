import styles from './stylesNewOrder';
import stylesGlobal from '../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../global/functionGlobal';
import truckTypes from '../data/truckTypes';
import goodsTypes from '../data/goodsTypes';
import MyButton from '../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';
import { GOOGLE_API_KEY } from '../../../../global/keyGG';

import { View, Text, Pressable, ScrollView, BackHandler, Alert } from 'react-native';
import { TextInput, Image,Modal,TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Foundation, MaterialIcons, Ionicons,FontAwesome,AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { AuthContext } from '../../../../context/AuthContext';

import AnimatedLoader from 'react-native-animated-loader';


import * as ImagePicker from 'expo-image-picker';
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
  const { locationNow } = useContext(AuthContext);

  const [addressFrom, setAddressFrom] = useState(locationNow);
  const [addressTo, setAddressTo] = useState();

  const [openTruck, setOpenTruck] = useState(false);
  const [valueTruck, setValueTruck] = useState(truckTypes[0].value);
  const [itemsTruck, setItemsTruck] = useState(truckTypes);

  const [openGoods, setOpenGoods] = useState(false);
  const [valueGoods, setValueGoods] = useState(goodsTypes[0].value);
  const [itemsGoods, setItemsGoods] = useState(goodsTypes);

  const [weight, setWeight] = useState('');
 
  const [listImage, setListImage] = useState([]);

  const [listImageSend, setListImageSend] = useState([]);

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [price, setPrice] = useState(1230100);

  const [modalVisible, setModalVisible] = useState(false);

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
            <ButtonAdd action={() => setModalVisible(true)} />
          ) : null}
        </View>
        {arr[arr.length - 1] == listImages[listImages.length - 1] && arr.length == column ? (
          <ButtonAdd action={() => setModalVisible(true)} />
        ) : null}
      </View>
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!result.canceled) {
      setListImage([...listImage, result.assets[0].uri]);
      setListImageSend([...listImageSend, result.assets[0]]);
    }
  };
  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setListImage([...listImage, result.assets[0].uri]);
      setListImageSend([...listImageSend, result.assets[0]]);
    } else {
      console.log("Không có ảnh được chọn");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Modal để chọn hoặc chụp ảnh */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <TouchableWithoutFeedback
              onPress={() => {
                // console.log(1);
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                      showImagePicker();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View styles={{ width: '100%' }}>
                      <FontAwesome
                        name="image"
                        size={25}
                        color="black"
                        style={{ margin: 10, marginTop: 12 }}
                      />
                    </View>
                    <View styles={{ width: '100%' }}>
                      <Text style={styles.chupanh}>Chọn ảnh từ thư viện</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                      openCamera();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View styles={{ width: '100%' }}>
                      <AntDesign
                        name="camera"
                        size={25}
                        color="black"
                        style={{ margin: 10, marginTop: 12 }}
                      />
                    </View>
                    <View>
                      <Text style={styles.chupanh}>Chụp ảnh</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
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
          onError={(e) => {
            Alert.alert('Thông báo', 'Lỗi không xác định');
            console.log('NewOrder: ' + e);
          }}
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
      {/* <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Cân nặng</Text>
        <View style={[styles.input, styles.input.addition]}>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={24}
            color="black"
            style={{ width: 30 }}
          />
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {}}>
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
            <Text style={[styles.font18, { marginRight: -70 }]}>KG</Text>
          </Pressable>
        </View>
      </View> */}
      {/* Hình ảnh */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Hình ảnh hàng hóa</Text>
        {listImage.length != 0 ? (
          <>
            {sliceIntoChunks(listImage, 3).map((e, i) => (
              <View key={i}>{renderRowImage(e, listImage, 3)}</View>
            ))}
          </>
        ) : (
          <ButtonAdd action={() => setModalVisible(true)} />
        )}
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
      <View style={{ marginTop: 10, marginBottom: 50, alignItems: 'center' }}>
        <MyButton
          text={'Tiếp theo'}
          type="large"
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          action={() => {
            navigation.navigate('NewOrderDetail', {
              item: {
                addressFrom: addressFrom,
                addressTo: addressTo,
                truckType: valueTruck,
                goodType: valueGoods,
                weight,
                listImageSend,
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
