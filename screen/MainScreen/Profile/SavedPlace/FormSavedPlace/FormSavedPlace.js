import styles from "./stylesFormSavedPlace";
import stylesGlobal from "../../../../../global/stylesGlobal";
import MyInput from "../../../../../components/MyInput/MyInput";
import MyButton from "../../../../../components/MyButton/MyButton";

import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import ReadMore from "react-native-read-more-text";

export default function FormSavedPlace({ navigation }) {
  const [address, setAddress] = useState(
    "336/15 Lê Hồng Phong P.12 Q.5 TP. Hồ Chí Minh"
  );

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
          action={() => {}}
        />
      </View>
    </View>
  );
}
