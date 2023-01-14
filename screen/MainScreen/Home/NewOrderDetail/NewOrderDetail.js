import styles from './stylesNewOrderDetail';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Foundation, Entypo, Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function NewOrderDetail({ route }) {
  const navigation = useNavigation();

  const { item } = route.params;
  const [expandFrom, setExpandFrom] = useState(true);
  const [expandTo, setExpandTo] = useState(true);
  const [checked, setChecked] = useState('receive');

  const [validNameF, setValidNameF] = useState();
  const [validPhoneF, setValidPhoneF] = useState();
  const [valueNameF, setValueNameF] = useState('');
  const [valuePhoneF, setValuePhoneF] = useState('');

  const checkValidF = () => validNameF && validPhoneF;

  const [validNameT, setValidNameT] = useState();
  const [validPhoneT, setValidPhoneT] = useState();
  const [valueNameT, setValueNameT] = useState('');
  const [valuePhoneT, setValuePhoneT] = useState('');

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
                <Foundation name="record" size={24} color={stylesGlobal.skyBlue} />
                <Text style={styles.labelHeader}>Người gửi</Text>
                {expandFrom ? (
                  <Entypo name="chevron-small-up" size={24} color="black" />
                ) : (
                  <Entypo name="chevron-small-down" size={24} color="black" />
                )}
              </View>
              {expandFrom ? null : (
                <Text style={styles.info}>
                  {valueNameF + '\n' + valuePhoneF + '\n' + item.addressFrom.address}
                </Text>
              )}
            </CollapseHeader>
            <CollapseBody>
              <View>
                <MyInput
                  placeholder={'Họ tên'}
                  valid={setValidNameF}
                  value={setValueNameF}
                  initialValue={item.addressFrom.name}
                  regex={/^[a-zA-Z ]{1,30}$/}
                  error={'Tên không hợp lệ'}
                  styleError={styles.error}
                  onlyBorderBottom={true}
                  borderWidth={1}
                  borderColor={stylesGlobal.darkGrey}
                  inputName={true}
                />
                <MyInput
                  placeholder={'Số điện thoại'}
                  valid={setValidPhoneF}
                  value={setValuePhoneF}
                  initialValue={item.addressFrom.phone}
                  regex={/^((09|03|07|08|05)([0-9]{8}))$/g}
                  error={'Số điện thoại không hợp lệ'}
                  styleError={styles.error}
                  onlyBorderBottom={true}
                  borderWidth={1}
                  borderColor={stylesGlobal.darkGrey}
                />
                <View style={styles.input}>
                  <Text style={styles.address}>{item.addressFrom.address}</Text>
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
                  {valueNameT + '\n' + valuePhoneT + '\n' + item.addressTo.address}
                </Text>
              )}
            </CollapseHeader>
            <CollapseBody>
              <View>
                <MyInput
                  placeholder={'Họ tên'}
                  valid={setValidNameT}
                  value={setValueNameT}
                  initialValue={item.addressTo.name}
                  regex={/^[a-zA-Z ]{1,30}$/}
                  error={'Tên không hợp lệ'}
                  styleError={styles.error}
                  onlyBorderBottom={true}
                  borderWidth={1}
                  borderColor={stylesGlobal.darkGrey}
                  inputName={true}
                />
                <MyInput
                  placeholder={'Số điện thoại'}
                  valid={setValidPhoneT}
                  value={setValuePhoneT}
                  initialValue={item.addressTo.phone}
                  regex={/^((09|03|07|08|05)([0-9]{8}))$/g}
                  error={'Số điện thoại không hợp lệ'}
                  styleError={styles.error}
                  onlyBorderBottom={true}
                  borderWidth={1}
                  borderColor={stylesGlobal.darkGrey}
                />
                <View style={styles.input}>
                  <Text style={styles.address}>{item.addressTo.address}</Text>
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
        <View style={stylesGlobal.inlineBetween}>
          <Text style={{ fontSize: 16, width: 135 }}>Người thanh toán:</Text>
          <View style={stylesGlobal.inline}>
            <TouchableOpacity style={stylesGlobal.inline} onPress={() => setChecked('send')}>
              <RadioButton
                value="send"
                status={checked === 'send' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('send')}
              />
              <Text>Người gửi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesGlobal.inline} onPress={() => setChecked('receive')}>
              <RadioButton
                value="receive"
                status={checked === 'receive' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('receive')}
              />
              <Text>Người nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Giá vận chuyển */}
        <View style={stylesGlobal.inlineBetween}>
          <Text style={{ fontSize: 16, width: 150 }}>Chi phí vận chuyển:</Text>
          <Text style={styles.price}>
            {item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} VNĐ
          </Text>
        </View>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          {checkValidF() && checkValidT() ? (
            <MyButton
              type={'large'}
              btnColor={stylesGlobal.mainGreen}
              txtColor={'white'}
              text="Đặt giao đơn hàng"
              action={() => {
                navigation.navigate('FinishPage');
              }}
            />
          ) : (
            <MyButton
              disable={true}
              type={'large'}
              btnColor={stylesGlobal.lightGreen}
              txtColor={'white'}
              text="Đặt giao đơn hàng"
            />
          )}
        </View>
      </View>
    </View>
  );
}
