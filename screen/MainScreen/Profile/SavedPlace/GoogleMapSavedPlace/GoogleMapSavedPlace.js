import styles from './stylesGoogleMapSavedPlace';
import stylesGlobal from '../../../../../global/stylesGlobal';

import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import { GOOGLE_API_KEY } from '../../../../../global/keyGG';
import { getAddressFromLocation } from '../../../../../global/utilLocation';

export default function GoogleMapSavedPlace() {
  const mapRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();

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

  const handleAddress = async () => {
    const camera = await mapRef.current?.getCamera();
    const resultAddress = await getAddressFromLocation(camera.center);
    if (!resultAddress) {
      Alert.alert('Thông báo', 'Vị trí bạn chọn không được hỗ trợ vận chuyển');
      return;
    } else {
      let checkLocation = resultAddress.includes('Việt Nam');
      if (!checkLocation) {
        Alert.alert('Thông báo', 'Vị trí bạn chọn không được hỗ trợ vận chuyển');
        return;
      }
      let addressSelected = {
        latitude: camera.center.latitude || 0,
        longitude: camera.center.longitude || 0,
        address: resultAddress,
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
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.iconBack}
        name="arrow-back"
        size={30}
        color={stylesGlobal.mainGreen}
        onPress={() => navigation.goBack()}
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        showsUserLocation={true}
        // showsMyLocationButton={true}
        zoomEnabled={true}
        addressForCoordinate={(e) => {
          console.log(e);
        }}
      />

      <Ionicons name="location" size={24} color="red" style={styles.marker} />

      <TouchableOpacity style={styles.chonTrenBanDo} onPress={() => handleAddress()}>
        <Text style={{ fontSize: 17, color: 'white', padding: 5 }}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}
