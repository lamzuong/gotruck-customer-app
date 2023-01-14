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
