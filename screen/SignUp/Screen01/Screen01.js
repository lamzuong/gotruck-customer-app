import styles from "../stylesSignUp";
import MyInput from "../../../components/MyInput/MyInput";

import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function Screen01({ validCallback }) {
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
  }, [validInput]);
  return (
    <View style={styles.phone}>
      <View style={styles.phone.viewFlagVn}>
        <Image
          source={require("../../../assets/images/flag-vn.jpg")}
          style={styles.phone.flagVn}
        />
        <Text style={styles.phone.phoneVn}>+84</Text>
      </View>
      <MyInput
        placeholder={"Nhập số điện thoại"}
        error={"Số điện thoại không hợp lệ"}
        regex={/^(((09|03|07|08|05)|(9|3|7|8|5))([0-9]{8}))$/g}
        width={250}
        valueCallback={callbackValue}
        validCallback={callbackValid}
        value={valueInput}
      />
    </View>
  );
}
