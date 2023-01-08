import styles from "../stylesSignUp";
import MyInput from "../../../components/MyInput/MyInput";

import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

export default function Screen02({ validCallback, valueCallback }) {
  const [valueInput, setValueInput] = useState();
  const callbackValue = (childData) => {
    setValueInput(childData);
  };
  const [validInput, setValidInput] = useState();
  const callbackValid = (childData) => {
    setValidInput(childData);
  };
  useEffect(() => {
    validCallback(validInput);
    valueCallback(valueInput);
  }, [validInput]);
  return (
    <View style={styles.otp}>
      <MyInput
        placeholder={"Nhập mã OTP"}
        error={"Mã OTP không hợp lệ"}
        regex={/^[0-9]{6}$/g}
        width={widthScreen - 60}
        valueCallback={callbackValue}
        validCallback={callbackValid}
        value={valueInput}
      />
    </View>
  );
}
