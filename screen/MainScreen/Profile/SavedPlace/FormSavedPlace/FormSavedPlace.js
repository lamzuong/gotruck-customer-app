import styles from "./stylesFormSavedPlace";
import stylesGlobal from "../../../../../global/stylesGlobal";
import MyInput from "../../../../../components/MyInput/MyInput";
import MyButton from "../../../../../components/MyButton/MyButton";

import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import ReadMore from "react-native-read-more-text";
import { useRoute } from "@react-navigation/native";

export default function FormSavedPlace({ navigation }) {
  const [address, setAddress] = useState();
  const route = useRoute();

  const { addressSelected } = route.params;
  useLayoutEffect(() => {
    if (addressSelected != undefined) {
      setAddress(addressSelected.address);
    }
  }, [route]);

  const handleLuuDiaChi = () => {
    navigation.navigate("SavedPlace");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.componentInput}>
          <Text style={styles.label}>Địa chỉ</Text>
          <Pressable
            style={styles.input}
            onPress={() => {
              navigation.navigate("SearchLocationSavedPlace");
            }}
          >
            <ReadMore numberOfLines={1} renderTruncatedFooter={() => null}>
              <Text style={{ fontSize: 18 }}>{address}</Text>
            </ReadMore>
          </Pressable>
        </View>
        <View style={styles.componentInput}>
          <Text style={styles.label}>Họ tên</Text>
          <View style={{ marginTop: 10 }}>
            <MyInput border={true} />
          </View>
        </View>
        <View style={styles.componentInput}>
          <Text style={styles.label}>Số điện thoại</Text>
          <View style={{ marginTop: 10 }}>
            <MyInput border={true} />
          </View>
        </View>
      </ScrollView>
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <MyButton
          type={"large"}
          btnColor={stylesGlobal.mainGreen}
          txtColor="white"
          text={"Lưu địa chỉ"}
          action={() => handleLuuDiaChi()}
        />
      </View>
    </View>
  );
}
