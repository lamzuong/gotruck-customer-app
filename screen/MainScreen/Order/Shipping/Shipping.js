import styles from './stylesShipping';
import MyOrder from '../../../../components/MyOrder/MyOrder';
// import order from '../dataOrder';

import { View, Text, FlatList, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import { socketClient } from '../../../../global/socket';
import { useIsFocused } from '@react-navigation/native';
import { GetListOrder } from '../../../../context/AuthAction';

export default function NotFinish() {
  const { user, dispatch, listOrder } = useContext(AuthContext);

  // const [order, setOrder] = useState(listOrder || []);
  const isFocus = useIsFocused();

  const renderUI = async () => {
    const orderList = await axiosClient.get('gotruck/order/user/' + user._id);
    if (JSON.stringify(listOrder) !== JSON.stringify(orderList)) {
      dispatch(GetListOrder(orderList));
    }
  };

  useEffect(() => {
    renderUI();
  }, [isFocus]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {listOrder?.map((item, index) =>
        item.status == 'Đang giao' ? <MyOrder order={item} key={index} /> : null,
      )}
      <View style={{ height: 30 }}></View>
    </ScrollView>
  );
}
