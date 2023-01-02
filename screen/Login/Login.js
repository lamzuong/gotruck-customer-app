import styles from "./stylesLogin";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import { Checkbox } from "react-native-paper";

export default function Login({ navigation }) {
  const scrollViewRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [checked, setChecked] = useState(true);
  const callbackPhone = (childData) => {
    setPhoneNumber(childData);
  };
  const callbackPass = (childData) => {
    setPassword(childData);
  };
  const checkValid = () => {
    return true;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <Image
          source={require("../../assets/images/logo-name-white.png")}
          style={styles.logoName}
        />
        <View style={{ alignItems: "center" }}>
          <View style={styles.phone}>
            <View style={styles.phone.viewFlagVn}>
              <Image
                source={require("../../assets/images/flag-vn.jpg")}
                style={styles.phone.flagVn}
              />
              <Text style={styles.phone.phoneVn}>+84</Text>
            </View>
            <View style={{ width: 220 }}>
              <MyInput
                placeholder={"Nhập số điện thoại"}
                width={250}
                valueCallback={callbackPhone}
                value={phoneNumber}
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <MyInput
              placeholder={"Mật khẩu"}
              width={382}
              password={true}
              valueCallback={callbackPass}
              value={password}
            />
          </View>
        </View>
        <View style={styles.viewAction}>
          <TouchableOpacity>
            <Text style={styles.txtForgetPass}>Quên mật khẩu ?</Text>
          </TouchableOpacity>
          <Pressable style={styles.viewSavePass}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color="white"
            />
            <Text style={styles.txtForgetPass}>Lưu mật khẩu</Text>
          </Pressable>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.viewButton}>
        <MyButton
          type="large"
          text={"Đăng nhập"}
          btnColor="black"
          txtColor={"white"}
          action={() => {
            checkValid() ? navigation.navigate("BottomTabs") : null;
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
