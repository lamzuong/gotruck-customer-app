import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from './keyGG';
import MapViewDirections from 'react-native-maps-directions';
import { Alert, Linking } from 'react-native';
import { Link } from '@react-navigation/native';
import axiosClient from '../api/axiosClient';
import { MAP_4D_KEY } from './map4dKey';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import decodePathPoLyline from 'decode-google-map-polyline';
export const getLocationCurrentOfUser = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Thông báo', 'Bạn đã từ chối cấp quyền truy cập vị trí', [
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }
  const location = await Location.getCurrentPositionAsync({});
  const latLng = location.coords.latitude + ',' + location.coords.longitude;
  const url = `https://api.map4d.vn/sdk/v2/geocode?key=${MAP_4D_KEY}&location=${latLng}`;
  const result = await axiosClient.get(url);
  if (result.code === 'ok') {
    let address = result.result[0].address;

    if (!address.includes('Việt Nam')) {
      address += ', Việt Nam';
    }
    const currentLocation = {
      address: address,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    return currentLocation;
  } else {
    return {
      address: '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh',
      latitude: 10.820685,
      longitude: 106.687631,
    };
  }
};

export const getRouteTwoLocation = async (origin, destination) => {
  const originStr = origin.latitude + ',' + origin.longitude;
  const destinationStr = destination.latitude + ',' + destination.longitude;
  const mode = 'Car';
  const url = `http://api.map4d.vn/sdk/route?key=${MAP_4D_KEY}&origin=${originStr}&destination=${destinationStr}&mode=${mode}&weighting=${0}`;
  const result = await axiosClient.get(url);
  if (result.code === 'ok') {
    return result;
  } else {
    return null;
  }
  // return '123';
};

export const getAddressFromLocation = async (location) => {
  const locationStr = location.latitude + ',' + location.longitude;
  const url = `https://api.map4d.vn/sdk/v2/geocode?key=${MAP_4D_KEY}&location=${locationStr}`;
  const result = await axiosClient.get(url);
  if (result.code === 'ok') {
    let address = result.result[0].address;
    if (!address.includes('Việt Nam')) {
      address += ', Việt Nam';
    }
    return address;
  } else {
    return null;
  }
  // return '12 Việt Nam';
};

export const getAddressFromText = async (text) => {
  const url = `http://api.map4d.vn/sdk/autosuggest?key=${MAP_4D_KEY}&text=${text}`;
  const result = await axiosClient.get(url);
  if (result.code === 'ok') {
    let listAdress = result.result.slice(0, 5); //only show 5 address
    return listAdress;
  } else {
    return null;
  }
};

export const getPoLylineFromEncode = (path) => {
  return decodePathPoLyline(path);
};
