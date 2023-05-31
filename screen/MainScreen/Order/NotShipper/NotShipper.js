import styles from './stylesNotShipper';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from '../dataOrder';

import { View, Text, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { socketClient } from '../../../../global/socket';
import { Modal } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../components/MyButton/MyButton';
import { SetListOrder } from '../../../../context/AuthAction';

export default function NotShipper() {
  const { user, listOrder, dispatch } = useContext(AuthContext);
  // const [order, setOrder] = useState(listOrder || []);
  const isFocus = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [reason, setReason] = useState('');
  const [itemCancel, setItemCancel] = useState('');

  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    if (orderList.length > 0 && JSON.stringify(listOrder) !== JSON.stringify(orderList)) {
      dispatch(SetListOrder(orderList));
    }
  };

  const handleCancelOrder = async (item) => {
    item.status = 'Đã hủy';
    item.reason_cancel = {
      user_cancel: 'Customer',
      content: reason,
    };

    const resOrderCancel = await axiosClient.put('gotruck/ordershipper/', item);

    if (resOrderCancel.status === 'Đã hủy') {
      await axiosClient.put('/gotruck/conversation/disable', { _id: item._id });
    }

    if (resOrderCancel.status === 'Đang giao' || resOrderCancel.status === 'Đã giao') {
      Alert.alert('Thông báo', 'Đơn hàng đang được giao');
    } else if (resOrderCancel.reason_cancel.user_cancel === 'Shipper') {
      Alert.alert('Thông báo', 'Đơn hàng đã bị hủy bởi tài xế');
    } else if (resOrderCancel.reason_cancel.user_cancel === 'AutoDelete') {
      Alert.alert('Thông báo', 'Đơn hàng đã bị hủy do quá thời hạn');
    } else if (resOrderCancel.reason_cancel.user_cancel === 'Customer') {
      socketClient.emit('customer_cancel', resOrderCancel);
    }
    setItemCancel('');
    setReason('');
    setValid(false);
    setShowModal(!showModal);
    renderUI();
  };

  useEffect(() => {
    renderUI();
  }, [isFocus]);

  return (
    <>
      <View style={styles.container2}>
        {showModal && (
          <View style={styles.centeredView}>
            <View style={styles.close}>
              <AntDesign
                onPress={() => setShowModal(!showModal)}
                name="close"
                size={30}
                color="black"
              />
            </View>
            <View style={styles.contentCancel}>
              <View style={styles.viewInput}>
                <Text style={styles.label}>Lý do hủy</Text>
                <MyInput
                  borderWidth={1}
                  value={setReason}
                  valid={setValid}
                  regex={/^.+/}
                  multiline={true}
                  inputName={true}
                  error={'Không được để trống'}
                />
              </View>
            </View>
            {valid ? (
              <View style={styles.btnCancel}>
                <MyButton
                  type={'medium'}
                  btnColor={'red'}
                  txtColor={'white'}
                  text="Hủy đơn"
                  action={() => handleCancelOrder(itemCancel)}
                />
              </View>
            ) : (
              <View style={styles.btnCancel}>
                <MyButton
                  type={'medium'}
                  btnColor={'rgb(240,128,128)'}
                  txtColor={'white'}
                  text="Hủy đơn"
                  disable={true}
                />
              </View>
            )}
          </View>
        )}
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {listOrder?.map((item, index) =>
          item.status == 'Chưa nhận' ? (
            <MyOrder
              setCancelItem={setItemCancel}
              isShowModal={showModal}
              setIsShowModal={setShowModal}
              order={item}
              key={index}
            />
          ) : null,
        )}

        <View style={{ height: 30 }}></View>
      </ScrollView>
    </>
  );
}
