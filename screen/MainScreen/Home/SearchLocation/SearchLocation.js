import styles from "./stylesSearchLocation";
import stylesGlobal from "../../../../global/stylesGlobal";

import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function SearchLocation({ navigation }) {
  const [valueInput, setValueInput] = useState("");
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={stylesGlobal.mainGreen}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.viewInput}>
          <TextInput
            style={styles.txtInput}
            placeholder={"Nhập địa chỉ"}
            value={valueInput}
            onChangeText={(text) => {
              setValueInput(text);
            }}
            autoFocus={true}
          />
          {valueInput && (
            <AntDesign
              name="closecircle"
              size={16}
              color="grey"
              onPress={() => {
                setValueInput("");
              }}
            />
          )}
        </View>
      </View>
      {/* Result search */}
      <ScrollView>
        <Text>SearchLocation</Text>
      </ScrollView>
      {/* Button choose */}
      <Pressable style={styles.buttonFooter} onPress={() => {}}>
        <Ionicons name="save" size={24} color={stylesGlobal.skyBlue} />
        <Text style={styles.txtFooter}>Chọn vị trí đã lưu</Text>
      </Pressable>
      <Pressable style={styles.buttonFooter} onPress={() => {}}>
        <Ionicons name="location" size={24} color="red" />
        <Text style={styles.txtFooter}>Chọn từ bản đồ</Text>
      </Pressable>
    </View>
  );
}
