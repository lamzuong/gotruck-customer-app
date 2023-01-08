import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./stylesMyInput";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function MyInput({
  placeholder,
  regex,
  error,
  showError = true,
  styleError,
  width,
  iconLeft,
  iconRight,
  clear = true,
  border = false,
  borderColor = "black",
  onlyBorderBottom = false,
  autoFocus = false,
  value = "",
  validCallback,
  valueCallback,
  password = false,
  small = false,
  valueCompare,
  style = null,
}) {
  const [valueInput, setValueInput] = useState(value);
  const [hideError, setHideError] = useState(true);
  const [encodePass, setEncodePass] = useState(true);

  const validate = (text) => regex.test(text);
  const compare = (text) => valueCompare === text;

  const callError = () => (setHideError(false), validCallback(false));
  const callValid = () => (setHideError(true), validCallback(true));

  return (
    <View style={[{ width: width }, style]}>
      <View style={[styles.input, small ? { paddingRight: 30 } : null]}>
        {password ? (
          <>
            <TextInput
              style={[styles.txtInput, { paddingRight: 50 }]}
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
              autoFocus={autoFocus}
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
          <View
            style={[
              styles.insideInput,
              border
                ? { borderWidth: 1, borderRadius: 10, borderColor: borderColor }
                : null,
              onlyBorderBottom
                ? { borderBottomWidth: 1, borderColor: borderColor }
                : null,
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {iconLeft ? (
                <View style={{ marginLeft: 10 }}>{iconLeft}</View>
              ) : null}

              <TextInput
                style={[
                  styles.txtInput,
                  clear ? styles.txtInput.haveClear : null,
                ]}
                placeholder={placeholder}
                onChangeText={(text) => {
                  setValueInput(text);
                  if (regex)
                    if (!validate(text)) callError();
                    else callValid();
                  if (valueCallback) valueCallback(text);
                }}
                value={valueInput}
                autoFocus={autoFocus}
              />

              {iconRight ? (
                <View style={{ marginRight: 10 }}>{iconRight}</View>
              ) : null}
            </View>
            {clear
              ? valueInput && (
                  <View style={{ marginRight: 20, marginLeft: -30 }}>
                    <AntDesign
                      name="closecircle"
                      size={16}
                      color="grey"
                      onPress={() => {
                        setValueInput("");
                        if (regex) callError();
                      }}
                    />
                  </View>
                )
              : null}
          </View>
        )}
      </View>
      {!hideError && showError ? (
        <Text style={styleError ? styleError : styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}
