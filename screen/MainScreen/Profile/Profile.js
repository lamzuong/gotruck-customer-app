import styles from "./stylesProfile";
import options from "./optionsProfile";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthContext } from "../../../context/AuthContext";

export default function Profile({ navigation }) {
  const {user} = useContext(AuthContext);

  const confirmRequest = (screen) => {
    Alert.alert("Xác nhận", "Bạn có muốn đăng xuất khỏi ứng dụng ?", [
      {
        text: "Hủy",
        onPress: () => null,
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate(screen) },
    ]);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.viewAccount}>
        <Image
          source={{
            uri: user.avatar,
          }}
          style={styles.viewAccount.avatar}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.viewAccount.name}>{user.name}</Text>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={styles.viewAccount.editAccount}>
              Chỉnh sửa tài khoản
            </Text>
            <MaterialIcons
              name="navigate-next"
              size={24}
              color="grey"
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={options}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                item.title === "Đăng xuất"
                  ? confirmRequest(item.navigateTo)
                  : navigation.navigate(item.navigateTo);
              }}
            >
              <View>{item.icon}</View>
              <Text style={[styles.txtItem, { color: item.color }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={styles.flatList}
      />
    </View>
  );
}
