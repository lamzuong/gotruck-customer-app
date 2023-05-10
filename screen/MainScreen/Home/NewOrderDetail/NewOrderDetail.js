import styles from './stylesNewOrderDetail';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Foundation, Entypo, Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../../context/AuthContext';
import axiosClient from '../../../../api/axiosClient';
import firebase from 'firebase/compat';
import uuid from 'react-native-uuid';
import { socketClient } from '../../../../global/socket';

export default function NewOrderDetail({ route }) {
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
  const [note, setNote] = useState('');

  const checkValidT = () => validNameT && validPhoneT;

  const navigation = useNavigation();

  const { item } = route.params;

  const { user } = useContext(AuthContext);

  const handleFinishOrder = async () => {
    const res = await axiosClient.get('/gotruck/goodsType');
    let checkHaveGood = false;
    res.forEach((e) => {
      if (item.goodType === e.value) {
        checkHaveGood = true;
      }
    });
    if (!checkHaveGood && item.goodTypeOther.trim() === '') {
      Alert.alert('Thông báo', 'Loại hàng hóa không tồn tại');
      return;
    }

    const resBlock = await axiosClient.get('gotruck/auth/block/' + user._id);
    if (resBlock.block) {
      Alert.alert('Thông báo', 'Tài bạn của bạn đã bị khóa nên không thể tạo đơn hàng');
      return;
    }
    let listURLImage = [];
    // setCheckUpload(true);
    for (let i = 0; i < item.listImageSend.length; i++) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', item.listImageSend[i].uri, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(uuid.v4());
      const snapshot = await ref.put(blob);
      // We're done with the blob, close and release it
      blob.close();
      const temp = await snapshot.ref.getDownloadURL();
      listURLImage.push(temp);
    }
    const feeapp = await axiosClient.get('gotruck/order/feeapp');
    const order = {
      id_customer: user._id,
      payer: checked,
      from_address: {
        address: item.addressFrom.address,
        latitude: item.addressFrom.latitude,
        longitude: item.addressFrom.longitude,
        name: valueNameF,
        phone: valuePhoneF,
      },
      to_address: {
        address: item.addressTo.address,
        latitude: item.addressTo.latitude,
        longitude: item.addressTo.longitude,
        name: valueNameT,
        phone: valuePhoneT,
      },
      fee: feeapp.fee || 10,
      note: note,
      status: 'Chưa nhận',
      date_create: new Date(),
      distance: Number(item.distance),
      total: Number(item.price),
      expectedTime: Number(item.time),
      good_type: item.goodType,
      truck_type: item.truckType,
      list_image_from: listURLImage,
    };

    try {
      const odrNew = await axiosClient.post('gotruck/order', order);
      if (!odrNew) {
        Alert.alert('Thông báo', 'Đặt đơn thất bại. Vui lòng thử lại');
      } else {
        socketClient.emit('customer-has-new-order', {
          type_truck: item.truckType,
          dataOrder: odrNew,
        });
        navigation.navigate('FinishPage');
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Lỗi không xác định');
    }
  };

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
              value={note}
              onChangeText={(text) => setNote(text)}
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
              text="Tạo đơn hàng"
              action={() => handleFinishOrder()}
            />
          ) : (
            <MyButton
              disable={true}
              type={'large'}
              btnColor={stylesGlobal.lightGreen}
              txtColor={'white'}
              text="Tạo đơn hàng"
            />
          )}
        </View>
      </View>
    </View>
  );
}
