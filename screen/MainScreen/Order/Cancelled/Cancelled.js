import styles from './stylesCancelled';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from "../dataOrder";

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { socketClient } from '../../../../global/socket';
import { SetListOrder } from '../../../../context/AuthAction';

export default function Cancelled() {
  const [order, setOrder] = useState([]);
  const { user, listOrder, dispatch } = useContext(AuthContext);
  const isFocus = useIsFocused();

  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    if (orderList.length > 0 && JSON.stringify(listOrder) !== JSON.stringify(orderList)) {
      dispatch(SetListOrder(orderList));
    }
  };

  useEffect(() => {
    renderUI();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {listOrder?.map((item, index) =>
        item.status == 'Đã hủy' ? <MyOrder order={item} key={index} /> : null,
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
