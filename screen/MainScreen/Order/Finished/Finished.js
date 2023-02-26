import styles from './stylesFinished';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { socketClient } from '../../../../global/socket';

export default function Finished() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    (async function () {
      const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
      if (orderList) {
        let orderNotShipper = [];
        orderList.forEach((e) => {
          if (e.status == 'Đã giao') orderNotShipper.push(e);
        });
        setOrder(orderNotShipper);
      }
    }.call(this));
  }, []);

  useEffect(() => {
    console.log('Finish socket');
    socketClient.off(user._id + '');
    socketClient.on(user._id + '', async (data) => {
      const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
      if (orderList) {
        let orderNotShipper = [];
        orderList.forEach((e) => {
          if (e.status == 'Đã giao') orderNotShipper.push(e);
        });
        setOrder(orderNotShipper);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {order.map((item, index) =>
        item.status == 'Đã giao' ? <MyOrder order={item} key={index} /> : null,
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
