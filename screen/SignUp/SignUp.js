import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./stylesSignUp";
import stylesGlobal from "../../global/stylesGlobal";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import Screen01 from "./Screen01/Screen01";
import Screen02 from "./Screen02/Screen02";
import Screen03 from "./Screen03/Screen03";
import Screen04 from "./Screen04/Screen04";

export default function SignUp({ navigation }) {
  const i = useRef(1);
  const [screen, setScreen] = useState(i.current);
  const label = [
    "Vui lòng nhập số điện thoại để tiếp tục",
    "Nhập mã OTP để tiếp tục",
    "Nhập họ tên và mật khẩu để hoàn tất\nđăng ký !!",
  ];
  const scrollViewRef = useRef();

  const [validData, setValidData] = useState(false);
  const callbackValid = (childData) => {
    setValidData(childData);
  };
  const [valueOTP, setValueOTP] = useState("");
  const callbackOTP = (childData) => {
    setValueOTP(childData);
  };
  const checkOTP = () => {
    if (valueOTP) return true;
    else return false;
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
        {screen < 4 ? (
          <Text style={styles.txtHeader}>
            Chào mừng bạn đã đến{"\n"}với GOTRUCK !!
          </Text>
        ) : (
          <Text style={styles.txtHeader}>
            Chúc mừng bạn đã đăng ký {"\n"}thành công !!
          </Text>
        )}

        {screen < 4 ? (
          <Text style={styles.txtLabel}>{label[i.current - 1]}</Text>
        ) : null}
        {screen == 1 ? (
          <Screen01 validCallback={callbackValid} />
        ) : screen == 2 ? (
          <Screen02 validCallback={callbackValid} valueCallback={callbackOTP} />
        ) : screen == 3 ? (
          <Screen03 validCallback={callbackValid} />
        ) : (
          <Screen04 />
        )}
      </ScrollView>
      <View style={styles.button}>
        {screen == 2 ? (
          <View style={{ marginBottom: 10 }}>
            <MyButton
              type="large"
              text="Trở về"
              btnColor="orange"
              txtColor="white"
              action={() => {
                setScreen(--i.current);
              }}
            />
          </View>
        ) : null}

        {validData || screen == 4 ? (
          <MyButton
            type="large"
            text={screen == 4 ? "Xác nhận" : "Tiếp tục"}
            btnColor="black"
            txtColor="white"
            action={() => {
              screen == 4
                ? navigation.navigate("BottomTabs")
                : screen == 2
                ? checkOTP()
                  ? (setScreen(++i.current), setValidData(false))
                  : null // alert error if invalid OTP
                : (setScreen(++i.current), setValidData(false));
            }}
          />
        ) : (
          <MyButton
            type="large"
            text="Tiếp tục"
            btnColor="grey"
            txtColor={stylesGlobal.darkGrey}
            disable={true}
          />
        )}
      </View>
    </View>
  );
}
