import styles from "./stylesSignUp";
import stylesGlobal from "../../global/stylesGlobal";
import MyButton from "../../components/MyButton/MyButton";
import MyInput from "../../components/MyInput/MyInput";

import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
export default function SignUp({ navigation }) {
  const [screen, setScreen] = useState(1);
  const [validData, setValidData] = useState(false);
  const [valueData, setValueData] = useState("");

  const label = [
    "Vui lòng nhập số điện thoại để tiếp tục",
    "Nhập mã OTP để tiếp tục",
    "Nhập họ tên để hoàn tất đăng ký !!",
  ];
  const scrollViewRef = useRef();

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
  const finishSignUp = () => {
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
        {screen < 4 ? (
          <>
            <Text style={styles.txtHeader}>
              Chào mừng bạn đã đến{"\n"}với GOTRUCK !!
            </Text>
            <Text style={styles.txtLabel}>{label[screen - 1]}</Text>
          </>
        ) : (
          <Text style={styles.txtHeader}>
            Chúc mừng bạn đã đăng ký {"\n"}thành công !!
          </Text>
        )}

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
        ) : screen == 2 ? (
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
        ) : screen == 3 ? (
          <View style={styles.viewNormal}>
            <MyInput
              placeholder={"Nhập họ tên đầy đủ"}
              error={"Họ tên không hợp lệ"}
              regex={/^[a-zA-Z ]{1,30}$/}
              width={widthScreen - 60}
              value={setValueData}
              valid={setValidData}
              inputName={true}
              screen={screen}
            />
          </View>
        ) : (
          <View style={styles.viewFinish}>
            <Text style={styles.viewFinish.title}>
              Hãy bắt đầu những đơn hàng đầu tiên nào{"\t\t"}
              <MaterialCommunityIcons
                name="truck-fast"
                size={25}
                color="white"
              />
            </Text>
            <Image
              source={require("../../assets/images/logo-truck.png")}
              style={styles.viewFinish.logoTruck}
            />
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonFooter}>
        {validData || screen == 4 ? (
          <MyButton
            type="large"
            text={screen == 4 ? "Xác nhận" : "Tiếp tục"}
            btnColor="black"
            txtColor="white"
            action={() => {
              screen == 4
                ? finishSignUp()
                : screen == 2
                ? checkOTP()
                  ? nextScreen()
                  : null // alert error if invalid OTP
                : nextScreen();
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
