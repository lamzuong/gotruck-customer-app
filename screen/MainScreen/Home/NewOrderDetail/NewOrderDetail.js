import styles from "./stylesNewOrderDetail";
import stylesGlobal from "../../../../global/stylesGlobal";
import MyInput from "../../../../components/MyInput/MyInput";
import MyButton from "../../../../components/MyButton/MyButton";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Foundation, Entypo, Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function NewOrderDetail({ route }) {
  const navigation = useNavigation();

  const { item } = route.params;
  const [expandFrom, setExpandFrom] = useState(true);
  const [expandTo, setExpandTo] = useState(true);
  const [checked, setChecked] = useState("send");

  const [validNameF, setValidNameF] = useState();
  const [validPhoneF, setValidPhoneF] = useState();
  const [valueNameF, setValueNameF] = useState("");
  const [valuePhoneF, setValuePhoneF] = useState("");

  const callbackValidNameF = (childData) => setValidNameF(childData);
  const callbackValidPhoneF = (childData) => setValidPhoneF(childData);
  const callbackValueNameF = (childData) => setValueNameF(childData);
  const callbackValuePhoneF = (childData) => setValuePhoneF(childData);

  const checkValidF = () => validNameF && validPhoneF;

  const [validNameT, setValidNameT] = useState();
  const [validPhoneT, setValidPhoneT] = useState();
  const [valueNameT, setValueNameT] = useState("");
  const [valuePhoneT, setValuePhoneT] = useState("");

  const callbackValidNameT = (childData) => setValidNameT(childData);
  const callbackValidPhoneT = (childData) => setValidPhoneT(childData);
  const callbackValueNameT = (childData) => setValueNameT(childData);
  const callbackValuePhoneT = (childData) => setValuePhoneT(childData);

  const checkValidT = () => validNameT && validPhoneT;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Người gửi */}
        <View style={styles.viewCollapse}>
          <Collapse
            onToggle={() => {
              setExpandFrom(!expandFrom);
            }}
            isExpanded
            disabled={!checkValidF()}
          >
            <CollapseHeader>
              <View style={styles.header}>
                <Foundation
                  name="record"
                  size={24}
                  color={stylesGlobal.skyBlue}
                />
                <Text style={styles.labelHeader}>Người gửi</Text>
                {expandFrom ? (
                  <Entypo name="chevron-small-up" size={24} color="black" />
                ) : (
                  <Entypo name="chevron-small-down" size={24} color="black" />
                )}
              </View>
              {expandFrom ? null : (
                <Text style={styles.info}>
                  {valueNameF + "\n" + valuePhoneF + item.addressFrom}
                </Text>
              )}
            </CollapseHeader>
            <CollapseBody>
              <View>
                <MyInput
                  placeholder={"Họ tên"}
                  validCallback={callbackValidNameF}
                  valueCallback={callbackValueNameF}
                  regex={/^[a-zA-Z ]{1,30}$/}
                  error={"Tên không hợp lệ"}
                  styleError={styles.error}
                  value={valueNameF}
                  onlyBorderBottom={true}
                />
                <MyInput
                  placeholder={"Số điện thoại"}
                  validCallback={callbackValidPhoneF}
                  valueCallback={callbackValuePhoneF}
                  regex={/^((09|03|07|08|05)([0-9]{8}))$/g}
                  error={"Số điện thoại không hợp lệ"}
                  styleError={styles.error}
                  value={valuePhoneF}
                  onlyBorderBottom={true}
                />
                <View style={styles.input}>
                  <Text style={styles.address}>{item.addressFrom}</Text>
                </View>
              </View>
            </CollapseBody>
          </Collapse>
        </View>
        {/* Người nhận */}
        <View style={[styles.viewCollapse, { marginTop: 10 }]}>
          <Collapse
            onToggle={() => {
              setExpandTo(!expandTo);
            }}
            isExpanded
            disabled={!checkValidT()}
          >
            <CollapseHeader>
              <View style={styles.header}>
                <Ionicons name="ios-location-sharp" size={22} color="red" />
                <Text style={styles.labelHeader}>Người nhận</Text>
                {expandTo ? (
                  <Entypo name="chevron-small-up" size={24} color="black" />
                ) : (
                  <Entypo name="chevron-small-down" size={24} color="black" />
                )}
              </View>
              {expandTo ? null : (
                <Text style={styles.info}>
                  {valueNameT + "\n" + valuePhoneT + item.addressTo}
                </Text>
              )}
            </CollapseHeader>
            <CollapseBody>
              <View>
                <MyInput
                  placeholder={"Họ tên"}
                  validCallback={callbackValidNameT}
                  valueCallback={callbackValueNameT}
                  regex={/^[a-zA-Z ]{1,30}$/}
                  error={"Tên không hợp lệ"}
                  styleError={styles.error}
                  value={valueNameT}
                  onlyBorderBottom={true}
                />
                <MyInput
                  placeholder={"Số điện thoại"}
                  validCallback={callbackValidPhoneT}
                  valueCallback={callbackValuePhoneT}
                  regex={/^((09|03|07|08|05)([0-9]{8}))$/g}
                  error={"Số điện thoại không hợp lệ"}
                  styleError={styles.error}
                  value={valuePhoneT}
                  onlyBorderBottom={true}
                />
                <View style={styles.input}>
                  <Text style={styles.address}>{item.addressTo}</Text>
                </View>
              </View>
            </CollapseBody>
          </Collapse>
        </View>
        {/* Note */}
        <View style={styles.viewNote}>
          <Text style={styles.labelHeader}>Ghi chú cho tài xế</Text>
          <View style={styles.note}>
            <TextInput
              style={styles.txtNote}
              placeholder="VD: Trường học, tòa nhà,..."
              multiline={true}
              numberOfLines={99}
            />
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        {/* Người thanh toán */}
        <View style={stylesGlobal.inline}>
          <Text style={{ fontSize: 16, width: 150 }}>Người thanh toán:</Text>
          <TouchableOpacity
            style={stylesGlobal.inline}
            onPress={() => setChecked("send")}
          >
            <RadioButton
              value="send"
              status={checked === "send" ? "checked" : "unchecked"}
              onPress={() => setChecked("send")}
            />
            <Text>Người gửi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesGlobal.inline}
            onPress={() => setChecked("receive")}
          >
            <RadioButton
              value="receive"
              status={checked === "receive" ? "checked" : "unchecked"}
              onPress={() => setChecked("receive")}
            />
            <Text>Người nhận</Text>
          </TouchableOpacity>
        </View>
        {/* Giá vận chuyển */}
        <View style={stylesGlobal.inlineBetween}>
          <Text style={{ fontSize: 16, width: 150 }}>Chi phí vận chuyển:</Text>
          <Text style={styles.price}>
            {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
            VNĐ
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {checkValidF() && checkValidT() ? (
            <MyButton
              type={"large"}
              btnColor={stylesGlobal.mainGreen}
              txtColor={"white"}
              text="Đặt giao đơn hàng"
              action={() => {
                navigation.navigate("FinishPage");
              }}
            />
          ) : (
            <MyButton
              disable={true}
              type={"large"}
              btnColor={stylesGlobal.lightGreen}
              txtColor={"white"}
              text="Đặt giao đơn hàng"
            />
          )}
        </View>
      </View>
    </View>
  );
}