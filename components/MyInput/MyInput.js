import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./stylesMyInput";
import { Ionicons } from "@expo/vector-icons";

export default function MyInput({
  placeholder,
  regex,
  error,
  width,
  value = "",
  validCallback,
  valueCallback,
  password = false,
  valueCompare,
}) {
  const [valueInput, setValueInput] = useState(value);
  const [hideError, setHideError] = useState(true);
  const [encodePass, setEncodePass] = useState(true);

  const validate = (text) => {
    return regex.test(text);
  };
  const compare = (text) => {
    return valueCompare === text;
  };

  return (
    <View style={{ width: width }}>
      <View style={styles.input}>
        {password ? (
          <>
            <TextInput
              style={styles.txtInput}
              placeholder={placeholder}
              onChangeText={(text) => {
                setValueInput(text);
                if (regex) {
                  if (!validate(text)) {
                    setHideError(false);
                    validCallback(false);
                  } else {
                    setHideError(true);
                    validCallback(true);
                  }
                }
                if (valueCompare) {
                  if (!compare(text)) {
                    setHideError(false);
                    validCallback(false);
                  } else {
                    setHideError(true);
                    validCallback(true);
                  }
                }
                if (valueCallback) valueCallback(text);
              }}
              value={valueInput}
              secureTextEntry={encodePass}
            />
            {encodePass ? (
              <Ionicons
                name="eye-off"
                size={24}
                color="black"
                style={styles.iconHide}
                onPress={() => setEncodePass(!encodePass)}
              />
            ) : (
              <Ionicons
                name="eye"
                size={24}
                color="black"
                style={styles.iconHide}
                onPress={() => setEncodePass(!encodePass)}
              />
            )}
          </>
        ) : (
          <TextInput
            style={styles.txtInput}
            placeholder={placeholder}
            onChangeText={(text) => {
              setValueInput(text);
              if (regex) {
                if (!validate(text)) {
                  setHideError(false);
                  validCallback(false);
                } else {
                  setHideError(true);
                  validCallback(true);
                }
              }
              if (valueCallback) valueCallback(text);
            }}
            value={valueInput}
          />
        )}
      </View>
      {hideError ? null : <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
