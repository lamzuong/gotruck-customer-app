import stylesGlobal from '../../../../global/stylesGlobal';
import styles from './stylesSelectLocationOnMap';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRef } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getAddressFromLocation, getRouteTwoLocation } from '../../../../global/utilLocation';
// import { MFMapView } from 'react-native-map4d-map/lib/commonjs/components/MFMapView';
// import { MFMapView } from 'react-native-map4d-map/lib/commonjs/components/MFMapView';
// import { MFMapView } from 'react-native-map4d-map/lib/commonjs';
// import {
//   MFMapView,
//   MFMarker,
//   MFCircle,
//   MFPolyline,
//   MFPolygon,
//   MFPOI,
//   MFDirectionsRenderer
// } from 'react-native-map4d-map'

// import {MFMapView} from 'react-native-map4d-map'

export default function SelectLocationOnMap() {
  const navigation = useNavigation();

  const mapRef = useRef();

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
        showsMyLocationButton={true}
        zoomEnabled={true}
      />
      <Ionicons name="location" size={30} color="red" style={styles.marker} />
      <TouchableOpacity style={styles.chonTrenBanDo} onPress={() => handleAddress()}>
        <Text style={{ fontSize: 17, color: 'white', padding: 5 }}>OK</Text>
      </TouchableOpacity>
    </View>
  );
}
