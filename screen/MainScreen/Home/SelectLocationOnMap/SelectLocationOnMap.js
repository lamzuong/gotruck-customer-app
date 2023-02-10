import styles from './stylesSelectLocationOnMap';
import stylesGlobal from '../../../../global/stylesGlobal';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

import { MapDirectionsResponse } from 'react-native-maps-directions';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import MyButton from '../../../../components/MyButton/MyButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

export default function SelectLocationOnMap() {
  const mapRef = useRef();
  const navigation = useNavigation();

  const route = useRoute();
  const { noiLayHang, addressTo, addressFrom } = route.params;

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  let INITIAL_POSITION = {
    latitude: 10.820685,
    longitude: 106.687631,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const handleAddress = async () => {
    const camera = await mapRef.current?.getCamera();
    Geocoder.init(GOOGLE_API_KEY, {
      language: 'vn',
    });
    Geocoder.from(camera.center)
      .then((json) => {
        let checkLocation = json.results[0].formatted_address.split(' ');
        if (checkLocation[checkLocation.length - 1] != 'Vietnam' && checkLocation[checkLocation.length - 1] != 'Nam') {
          Alert.alert('Thông báo', 'Vị trí bạn chọn không được hỗ trợ vận chuyển');
          return;
        }
        let addressSelected = {
          latitude: camera.center.latitude || 0,
          longitude: camera.center.longitude || 0,
          address: json.results[0].formatted_address,
        };

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
                if (responseJson.status == 'OK' )
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
      })
      .catch((error) => console.log(error));
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

      <Ionicons name="location" size={30} color="red" style={styles.marker} />

      <TouchableOpacity style={styles.chonTrenBanDo} onPress={() => handleAddress()}>
        <Text style={{ fontSize: 17, color: 'white', padding: 5 }}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}
