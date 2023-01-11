import styles from "./stylesSearchLocation";
import stylesGlobal from "../../../../global/stylesGlobal";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Geocoder from "react-native-geocoding";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

import { GOOGLE_API_KEY } from "../../../../global/keyGG";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function DiaChiNhanHang() {
  const route = useRoute();
  const { noiLayHang, addressFrom, currentLocation } = route.params;
  const navigation = useNavigation();

  const currentLocationUser = {
    description: "Vị trí hiện tại",
    geometry: {
      location: {
        lat: currentLocation?.latitude,
        lng: currentLocation?.longitude,
      },
    },
  };

  const DHCongNghiep = {
    description: "Trường Đại học Công nghiệp TPHCM",
    geometry: { location: { lat: 10.820685, lng: 106.687631 } },
  };

  const handleAddress = (data, details) => {
    let addressSelected = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
      address: data.description,
    };
    if (noiLayHang) {
      navigation.navigate("NewOrder", {
        addressRecieve: addressSelected,
      });
    } else {
      navigation.navigate("GoogleMap", {
        addressRecieve: addressFrom,
        addressDelivery: addressSelected,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={{ top: 10 }}
          name="arrow-back"
          size={25}
          color={stylesGlobal.mainGreen}
          onPress={() => navigation.goBack()}
        />

        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder={"Nhập địa chỉ nhận hàng"}
          enablePoweredByContainer={false}
          timeout={5000}
          fetchDetails
          onPress={(data, details = null) => {
            handleAddress(data, details);
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_API_KEY,
            language: "vn",
            components: "country:vn",
          }}
          predefinedPlaces={[currentLocationUser, DHCongNghiep]}
        />
      </View>
      <Pressable
        style={styles.buttonFooter}
        onPress={() => {
          if (noiLayHang)
            navigation.navigate("SelectLocationOnMap", { noiLayHang: true });
          else
            navigation.navigate("SelectLocationOnMap", {
              noiLayHang: false,
              addressFrom: addressFrom,
            });
        }}
      >
        <Ionicons name="location" size={24} color="red" />
        <Text style={styles.txtFooter}>Chọn từ bản đồ</Text>
      </Pressable>
    </View>
  );
}
