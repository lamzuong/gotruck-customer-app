import styles from './stylesNotShipper';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from '../dataOrder';

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { socketClient } from '../../../../global/socket';

export default function NotShipper() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  const isFocus = useIsFocused();

  const handleCancel = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    if (orderList) {
      let orderNotShipper = [];
      orderList.forEach((e) => {
        if (e.status == 'Chưa nhận') {
          orderNotShipper.push(e);
        }
      });
      setOrder(orderNotShipper);
    }
  };

  useEffect(() => {
    handleCancel();
    console.log('Not Shipper socket');
    socketClient.off(user._id + '');
    socketClient.on(user._id + '', (data) => {
      handleCancel();
    });
  }, [isFocus]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {order.length != 0 ? (
        <>
          {order.map((item, index) =>
            item.status == 'Chưa nhận' ? (
              <MyOrder order={item} btnHuy={handleCancel} key={index} />
            ) : null,
          )}
        </>
      ) : (
        <></>
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
