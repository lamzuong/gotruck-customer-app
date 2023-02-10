import { getLocationUserNow } from '../global/functionGlobal';
import AuthReducer from './AuthReducer';

import React, { createContext, useEffect, useReducer, useState } from 'react';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from '../global/keyGG';

const INITIAL_STATE = {
  user: null,

  locationNow: null,
};

// INITIAL_STATE.user = {
//   _id: '63e1d1112b67035bb9634dae',
//   name: 'Ngueen TrungQQQQQQ',
//   phone: '0359434723',
//   avatar:
//     'https://firebasestorage.googleapis.com/v0/b/kltn-5be2b.appspot.com/o/800c0432-2e1a-481f-bd77-8940e99206f6?alt=media&token=a7d7e251-b8df-4395-8deb-00122a381100',
//   createdAt: '2023-02-07T11:18:25.961+07:00',
//   updatedAt: '2023-02-08T15:52:12.570+07:00',
//   __v: 0,
// };

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [address, setAddress] = useState({
    address: '12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh',
    latitude: 10.820685,
    longitude: 106.687631,
  });

  useEffect(() => {
    const getLocationUserNow = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Quyền truy cập vị trí đã bị từ chối');
        return null;
      }
      const location = await Location.getCurrentPositionAsync({});
      Geocoder.init(GOOGLE_API_KEY, {
        language: 'vn',
      });
      Geocoder.from({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
        .then((json) => {
          const currentLocationTemp = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            address: json.results[0].formatted_address,
          };
          setAddress(currentLocationTemp);
          return currentLocationTemp;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    };
    getLocationUserNow();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        locationNow: address,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
