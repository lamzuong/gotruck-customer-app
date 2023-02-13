import styles from './stylesShipping';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from '../dataOrder';

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';

export default function NotFinish() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async function () {
      const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
      if (orderList) {
        let orderNotShipper = [];
        orderList.forEach((e) => {
          if (e.status == 'Đang giao') orderNotShipper.push(e);
        });
        setOrder(orderNotShipper);
      }
    }.call(this));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {order.map((item, index) =>
        item.status == 'Đang giao' ? <MyOrder order={item} key={index} /> : null,
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
