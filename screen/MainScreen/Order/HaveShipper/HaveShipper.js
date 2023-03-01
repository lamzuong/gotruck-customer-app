import styles from './stylesHaveShipper';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { socketClient } from '../../../../global/socket';

import MyInput from '../../../../components/MyInput/MyInput';
import MyButton from '../../../../components/MyButton/MyButton';
import { AntDesign } from '@expo/vector-icons';

export default function HaveShipper() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  const isFocus = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [reason, setReason] = useState('');
  const [itemCancel, setItemCancel] = useState('');

  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    if (orderList) {
      let orderNotShipper = [];
      orderList.forEach((e) => {
        if (e.status == 'Đã nhận') orderNotShipper.push(e);
      });
      setOrder(orderNotShipper);
    }
  };
  const handleCancelOrder = async (item) => {
    item.status = 'Đã hủy';
    item.reason_cancel = {
      user_cancel: 'Customer',
      content: reason,
    };
    await axiosClient.put('gotruck/ordershipper/', item);
    setShowModal(!showModal);
    setItemCancel('');
    setReason('');
    setValid(false);
    renderUI();
  };

  useEffect(() => {
    renderUI();
    console.log('Have Shipper socket');
    socketClient.off(user._id + '');
    socketClient.on(user._id + '', (data) => {
      renderUI();
    });
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
                  text="Hủy"
                  action={() => handleCancelOrder(itemCancel)}
                />
              </View>
            ) : (
              <View style={styles.btnCancel}>
                <MyButton
                  type={'medium'}
                  btnColor={'rgb(240,128,128)'}
                  txtColor={'white'}
                  text="Hủy"
                  disable={true}
                />
              </View>
            )}
          </View>
        )}
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {order.map((item, index) =>
          item.status == 'Đã nhận' ? (
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
