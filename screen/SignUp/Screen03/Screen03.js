import styles from "../stylesSignUp";
import MyInput from "../../../components/MyInput/MyInput";

import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

export default function Screen03({ validCallback }) {
  const [validName, setValidName] = useState();
  const [validPass, setValidPass] = useState();
  const [validRepass, setValidRepass] = useState();

  const callbackValidName = (childData) => {
    setValidName(childData);
  };
  const callbackValidPass = (childData) => {
    setValidPass(childData);
  };
  const callbackValidRepass = (childData) => {
    setValidRepass(childData);
  };

  const [valuePass, setValuePass] = useState();
  const callbackValuePass = (childData) => {
    setValuePass(childData);
  };

  useEffect(() => {
    if (validName && validPass && validRepass) {
      validCallback(true);
    }
  }, [validName, validPass, validRepass]);
  return (
    <View style={styles.otp}>
      <MyInput
        placeholder={"Nhập họ tên đầy đủ"}
        error={"Họ tên không hợp lệ"}
        regex={/^[a-zA-Z ]{1,30}$/}
        width={widthScreen - 60}
        validCallback={callbackValidName}
      />
      <View style={{ marginVertical: 10 }}>
        <MyInput
          placeholder={"Nhập mật khẩu"}
          error={"Mật khẩu bao gồm chữ hoa, chữ thường, số,\nký tự đặc biệt"}
          regex={
            /^(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}$/
          }
          width={widthScreen - 60}
          validCallback={callbackValidPass}
          valueCallback={callbackValuePass}
          password={true}
        />
      </View>
      <MyInput
        placeholder={"Nhập lại mật khẩu"}
        error={"Nhập lại mật khẩu không trùng khớp"}
        valueCompare={valuePass}
        width={widthScreen - 60}
        validCallback={callbackValidRepass}
        password={true}
      />
    </View>
  );
}
