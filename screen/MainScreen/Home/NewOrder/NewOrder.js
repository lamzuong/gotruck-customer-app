import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';
import MyButton from '../../../../components/MyButton/MyButton';
import MyInput from '../../../../components/MyInput/MyInput';
import { sliceIntoChunks } from '../../../../global/functionGlobal';
import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import stylesGlobal from '../../../../global/stylesGlobal';
import styles from './stylesNewOrder';

import {
  AntDesign,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ReadMore from 'react-native-read-more-text';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axiosClient from '../../../../api/axiosClient';
import * as ImagePicker from 'expo-image-picker';
import { getRouteTwoLocation } from '../../../../global/utilLocation';
import { AuthContext } from '../../../../context/AuthContext';

const toAdd = {
  _id: '63ef7acd66fdc4f6bdb50159',
  address: 'RMCQ+72W, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam',
  latitude: 10.820685261169594,
  longitude: 106.68763093650341,
  name: 'aa',
  phone: '0999999999',
  id_customer: '63ef7a0866fdc4f6bdb5014c',
  createdAt: '2023-02-17T20:02:05.706+07:00',
  updatedAt: '2023-02-17T20:02:05.706+07:00',
  __v: 0,
};

const fromAdd = {
  _id: '63e5d9d4902f9038b6c10f57',
  address: '58/5K Truông Tre, Linh Xuân, Thủ Đức, Bình Dương, Việt Nam',
  latitude: 10.890244509604937,
  longitude: 106.7674527621348,
  name: 'q',
  phone: '0999999999',
  id_customer: '63e1d1112b67035bb9634dae',
  createdAt: '2023-02-10T12:44:52.746+07:00',
  updatedAt: '2023-02-10T12:44:52.746+07:00',
  __v: 0,
};
export default function NewOrder({ navigation }) {
  const { user, locationNow, listOrder } = useContext(AuthContext);

  // const [addressFrom, setAddressFrom] = useState(locationNow);
  // const [addressTo, setAddressTo] = useState();

  //Test
  const [addressFrom, setAddressFrom] = useState(fromAdd);
  const [addressTo, setAddressTo] = useState(toAdd);

  const [openTruck, setOpenTruck] = useState(false);
  const [valueTruck, setValueTruck] = useState('');
  const [itemsTruck, setItemsTruck] = useState([]);
  const [openGoods, setOpenGoods] = useState(false);
  const [valueGoods, setValueGoods] = useState(null);
  const [itemsGoods, setItemsGoods] = useState([]);
  const [otherGoods, setOtherGoods] = useState('');
  const [listImage, setListImage] = useState([]);
  const [listImageSend, setListImageSend] = useState([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [price, setPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [truckstype, setTrucksType] = useState();

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

  const traceRouteOnReady = async () => {
    // const result = await getRouteTwoLocation(addressFrom, addressTo);

    // let distanceTemp = (result.result.routes[0].distance.value / 1000).toFixed(1);
    // let timeTemp = (result.result.routes[0].duration.value / 60).toFixed(1);

    let distanceTemp = '13.4';
    let timeTemp = '18.0';

    setDistance(distanceTemp);
    setTime(timeTemp);
    setPriceNew(distanceTemp);
  };

  const setPriceNew = async (distanceTemp) => {
    const transportPrice = await axiosClient.get('gotruck/transportprice/');
    for (let i = 0; i < transportPrice.length; i++) {
      if (valueTruck == transportPrice[i]?.id_truck_type?.name) {
        if (Number(distanceTemp) <= 2 && transportPrice[i]?.id_distance?.distance == '<=2') {
          setPrice(transportPrice[i]?.price * Number(distanceTemp));
        } else if (Number(distanceTemp) > 2 && transportPrice[i]?.id_distance?.distance == '>2') {
          setPrice(transportPrice[i]?.price * Number(distanceTemp));
        }
      }
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập máy ảnh', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
      ]);
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
      Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập kho ảnh', [
        {
          text: 'Hủy',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
      ]);
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
    }
  };

  const handleContinue = () => {
    if (
      addressTo &&
      addressFrom
      //  && listImageSend.length > 1
    ) {
      navigation.navigate('NewOrderDetail', {
        item: {
          addressFrom: addressFrom,
          addressTo: addressTo,
          truckType: valueTruck,
          goodType: otherGoods ? otherGoods : valueGoods,
          listImageSend,
          time,
          distance,
          price,
        },
      });
    } else if (!addressFrom) {
      Alert.alert('Thông báo', 'Vui lòng điền nơi lấy hàng!');
    } else if (!addressTo) {
      Alert.alert('Thông báo', 'Vui lòng điền nơi giao hàng!');
    } else if (listImageSend.length < 2) {
      Alert.alert('Thông báo', 'Hình ảnh hàng hóa phải có tối thiểu 2 hình!');
    }
  };

  // get goods type
  const icon = () => {
    return <AntDesign name="dropbox" size={24} color="orange" />;
  };

  // get truck type
  const iconTruck = () => {
    return <MaterialCommunityIcons name="truck" size={24} color={stylesGlobal.mainGreen} />;
  };

  useEffect(() => {
    const getTrucksType = async () => {
      const res = await axiosClient.get('/gotruck/transportprice/trucktype');
      let trucksType = [];
      for (const e of res) {
        trucksType.push({
          label: 'Xe ' + e.name + ' tấn',
          value: e.name,
          icon: iconTruck,
        });
      }
      setTrucksType([...res]);
      setValueTruck(trucksType[0].value);
      setItemsTruck(trucksType);
    };
    getTrucksType();
  }, []);

  useEffect(() => {
    const getGoodsType = async () => {
      const res = await axiosClient.get('/gotruck/goodsType');
      let goodsType = [];
      for (const e of res) {
        goodsType.push({
          label: e.label,
          value: e.value,
          icon: icon,
        });
      }
      setValueGoods(goodsType[0].value);
      setItemsGoods(goodsType);
    };
    getGoodsType();
  }, []);

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
      await setPriceNew(distance);
    }.call(this));
  }, [valueTruck]);

  useEffect(() => {
    if (route.params) {
      const { addressRecieve, addressDelivery } = route.params;
      if (addressRecieve != undefined) setAddressFrom(addressRecieve);
      if (addressDelivery != undefined) setAddressTo(addressDelivery);
    }
  }, [route]);

  useEffect(() => {
    if (addressFrom && addressTo) {
      traceRouteOnReady();
    }
  }, [addressFrom, addressTo]);

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Modal để chọn hoặc chụp ảnh */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
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
            placeholder="Chọn loại xe "
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
      {valueGoods === 'Khác' && (
        <MyInput
          value={setOtherGoods}
          borderWidth={1}
          onlyBorderBottom={true}
          placeholder="Nhập tên loại hàng hóa"
        />
      )}

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
            handleContinue();
          }}
        />
      </View>
    </ScrollView>
  );
}
