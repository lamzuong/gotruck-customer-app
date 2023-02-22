import styles from './stylesHaveShipper';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';

export default function HaveShipper() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  const isFocus = useIsFocused();
  const handleCancel = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    if (orderList) {
      let orderNotShipper = [];
      orderList.forEach((e) => {
        if (e.status == 'Đã nhận') orderNotShipper.push(e);
      });
      setOrder(orderNotShipper);
    }
  };

  useEffect(() => {
    handleCancel();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {order.map((item, index) =>
        item.status == 'Đã nhận' ? (
          <MyOrder order={item} btnHuy={handleCancel} key={index} />
        ) : null,
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
