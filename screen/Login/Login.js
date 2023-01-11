import styles from "./stylesLogin";
import stylesGlobal from "../../global/stylesGlobal";
import MyButton from "../../components/MyButton/MyButton";

import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MyInput from "../../components/MyInput/MyInput";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
export default function Login({ navigation }) {
  const [screen, setScreen] = useState(1);
  const label = [
    "Vui lòng nhập số điện thoại để tiếp tục",
    "Nhập mã OTP để đăng nhập nào ^^ !!!",
  ];
  const scrollViewRef = useRef();

  const [validData, setValidData] = useState(false);
  const [valueData, setValueData] = useState("");

  const checkOTP = () => {
    if (valueData) return true;
    else return false;
  };
  const backScreen = () => {
    setScreen((prev) => prev - 1);
  };
  const nextScreen = () => {
    setValueData(""), setValidData(false);
    setScreen((prev) => prev + 1);
  };
  const toMainScreen = () => {
    navigation.navigate("MainScreen");
  };
  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      screen == 1 ? navigation.navigate("Welcome") : backScreen();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [screen]);
  //------------------------------
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <Image
          source={require("../../assets/images/logo-name-white.png")}
          style={styles.logoName}
        />
        <Text style={styles.txtHeader}>
          Chào mừng bạn đã đến{"\n"}với GOTRUCK !!
        </Text>

        <Text style={styles.txtLabel}>{label[screen - 1]}</Text>
        {screen == 1 ? (
          <View style={styles.phone}>
            <View style={styles.phone.viewFlagVn}>
              <Image
                source={require("../../assets/images/flag-vn.jpg")}
                style={styles.phone.flagVn}
              />
              <Text style={styles.phone.phoneVn}>+84</Text>
            </View>
            <MyInput
              placeholder={"Số điện thoại"}
              error={"Số điện thoại không hợp lệ"}
              regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
              width={230}
              value={setValueData}
              valid={setValidData}
              screen={screen}
            />
          </View>
        ) : (
          <View style={styles.viewNormal}>
            <MyInput
              placeholder={"Nhập mã OTP"}
              error={"Mã OTP không hợp lệ"}
              regex={/^[0-9]{6}$/g}
              width={widthScreen - 60}
              value={setValueData}
              valid={setValidData}
              screen={screen}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonFooter}>
        {validData ? (
          <MyButton
            type="large"
            text={screen == 2 ? "Xác nhận" : "Tiếp tục"}
            btnColor="black"
            txtColor="white"
            action={() => {
              screen == 2
                ? checkOTP()
                  ? toMainScreen()
                  : null // alert error if invalid OTP
                : nextScreen();
            }}
          />
        ) : (
          <MyButton
            type="large"
            text={screen == 2 ? "Xác nhận" : "Tiếp tục"}
            btnColor="grey"
            txtColor={stylesGlobal.darkGrey}
            disable={true}
          />
        )}
      </View>
    </View>
  );
}
