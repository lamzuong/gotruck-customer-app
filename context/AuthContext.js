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

// INITIAL_STATE.user=
// {
//   _id: '63e11cca1518b95f6eb8c077',
//   name: 'bbbbbbb',
//   phone: '0359434729',
//   avatar: 'https://firebasestorage.googleapis.com/v0/b/kltn-5be2b.appspot.com/o/defaultAvatar.png?alt=media&token=8b04dd31-d894-4b58-ab60-1dfc9e850cca',
//   createdAt: '2023-02-06T15:29:14.988+00:00',
//   updatedAt: '2023-02-06T16:05:46.490+00:00',
//   __v: 0,
// }

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getLocationUserNow = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return null;
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
