import { View, Text, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './stylesMyInput';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function MyInput({
  placeholder,
  regex,
  error,
  showError = true,
  styleError,
  width,
  height,
  iconLeft,
  iconRight,
  clear = true,
  borderWidth = null,
  borderColor = 'black',
  multiline = false,
  numberOfLines = 1,
  onlyBorderBottom = false,
  autoFocus = false,
  initialValue = '',
  value,
  valid,
  inputName = false,
  screen,
}) {
  useEffect(() => {
    setValueInput('');
    setHideError(true);
  }, [screen]);
  useEffect(() => {
    setValueInput(initialValue);
    setHideError(true);
  }, [initialValue]);
  const [valueInput, setValueInput] = useState(initialValue);
  const [hideError, setHideError] = useState(true);

  const removeAscent = (str) => {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  };

  const validate = (text) => {
    if (inputName) return regex.test(removeAscent(text));
    else return regex.test(text);
  };
  const callValid = () => (valid(true), setHideError(true));
  const callError = () => (valid(false), setHideError(false));

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.viewInput,
          { width: width, height: height },
          borderWidth
            ? onlyBorderBottom
              ? {
                  borderBottomWidth: borderWidth,
                  borderColor: borderColor,
                }
              : {
                  borderWidth: borderWidth,
                  borderRadius: 10,
                  borderColor: borderColor,
                }
            : null,
        ]}
      >
        <View style={styles.viewInputHaveClear}>
          <View style={styles.insideInput}>
            {iconLeft ? <View style={{ marginRight: 10 }}>{iconLeft}</View> : null}

            <TextInput
              style={styles.txtInput}
              placeholder={placeholder}
              onChangeText={(text) => {
                setValueInput(text);
                value(text);

                if (regex) {
                  if (!validate(text)) callError();
                  else callValid();
                }
              }}
              value={valueInput}
              autoFocus={autoFocus}
              multiline={multiline}
              numberOfLines={numberOfLines}
            />
          </View>
          {clear
            ? valueInput && (
                <AntDesign
                  name="closecircle"
                  size={16}
                  color="grey"
                  onPress={() => {
                    setValueInput('');
                    if (regex) callError();
                  }}
                />
              )
            : null}
        </View>
        {iconRight ? <View style={{ marginLeft: 10 }}>{iconRight}</View> : null}
      </View>
      {/* Show Error */}
      {!hideError && showError ? (
        <Text style={styleError ? styleError : styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}
