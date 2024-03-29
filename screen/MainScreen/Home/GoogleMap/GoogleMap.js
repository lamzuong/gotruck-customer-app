import styles from './stylesGoogleMap';
import stylesGlobal from '../../../../global/stylesGlobal';

import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions, Text, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GOOGLE_API_KEY } from '../../../../global/keyGG';
import MyButton from '../../../../components/MyButton/MyButton';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { getPoLylineFromEncode, getRouteTwoLocation } from '../../../../global/utilLocation';

export default function GoogleMap() {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [showButtonTiepTuc, setshowButtonTiepTuc] = useState(false);
  const [showDetailOrigin, setshowDetailOrigin] = useState(true);
  const [showDetailDestination, setshowDetailDestination] = useState(true);
  const [routePolyline, setRoutePolyline] = useState([]);

  const mapRef = useRef();

  const navigation = useNavigation();

  const route = useRoute();
  const { addressRecieve, addressDelivery } = route.params;

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
  const edgePaddingValue = 70;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const zoomMap = () => {
    mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    setshowButtonTiepTuc(true);
  };
  setTimeout(() => {
    zoomMap();
  }, 1000);

  useEffect(() => {
    if (addressRecieve != undefined) {
      setOrigin(addressRecieve);
    }
    if (addressDelivery != undefined) {
      setDestination(addressDelivery);
    }
  }, [route]);

  useEffect(() => {
    (async function () {
      if (origin && destination) {
        const resultRoute = await getRouteTwoLocation(origin, destination);
        let routePolyTemp = [];
        if (resultRoute) {
          const listPoly = getPoLylineFromEncode(resultRoute?.result.routes[0].overviewPolyline);
          listPoly?.forEach((el) => {
            routePolyTemp.push({ latitude: el.lat, longitude: el.lng });
          });
          setRoutePolyline(routePolyTemp);
        }
      }
    }.call(this));
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.iconBack}
        name="arrow-back"
        size={35}
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
        showsCompass={true}
        zoomEnabled={true}
      >
        {origin && (
          <Marker
            coordinate={origin}
            onPress={() => {
              setshowDetailOrigin(!showDetailOrigin);
            }}
          >
            {showDetailOrigin && (
              <View style={styles.coordinate}>
                <Text style={styles.title}>Vị trí nhận hàng</Text>
                <Text style={styles.description}>{origin.address}</Text>
              </View>
            )}
            <Ionicons name="location" size={30} color="#0DBEBE" style={styles.marker} />
          </Marker>
        )}
        {destination && (
          <Marker
            coordinate={destination}
            onPress={() => {
              setshowDetailDestination(!showDetailDestination);
            }}
          >
            {showDetailDestination && (
              <View style={styles.coordinate}>
                <Text style={styles.title}>Vị trí giao hàng</Text>
                <Text style={styles.description}>{destination.address}</Text>
              </View>
            )}
            <Ionicons name="location" size={30} color="red" style={styles.marker} />
          </Marker>
        )}

        {origin && destination && (
          <Polyline coordinates={routePolyline} strokeColor="rgb(0,176,255)" strokeWidth={8} />
        )}
      </MapView>
      {showButtonTiepTuc && (
        <View style={{ position: 'absolute', bottom: 10 }}>
          <MyButton
            type={'large'}
            text="Tiếp tục"
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            action={() =>
              navigation.navigate('NewOrder', {
                addressRecieve: addressRecieve,
                addressDelivery: addressDelivery,
              })
            }
          />
        </View>
      )}
    </View>
  );
}
