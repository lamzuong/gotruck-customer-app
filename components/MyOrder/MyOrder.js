import styles from './stylesMyOrder';
import stylesGlobal from '../../global/stylesGlobal';
import MyButton from '../MyButton/MyButton';

import { View, Text, Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import ReadMore from 'react-native-read-more-text';

import { AuthContext } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { socketClient } from '../../global/socket';

export default function MyOrder({ order, btnHuy }) {
  const { user } = useContext(AuthContext);
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const [showModalReason, setShowReason] = useState(false);
  const [reason, setReason] = useState('');

  const hanldeCancelOrder = async () => {
    Alert.alert('Xác nhận', 'Bạn chắc chắn muốn hủy đơn?', [
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const temp = order;
          temp.status = 'Đã hủy';
          temp.reason_cancel = {
            user_cancel: 'Customer',
            content: 'Đơn hàng không hợp lệ',
          };
          await axiosClient.put('gotruck/ordershipper/', temp);
          btnHuy();
        },
      },
    ]);
  };
  const handleCancelOrder = async (item) => {
    item.status = 'Đã hủy';
    item.reason_cancel = {
      user_cancel: 'Shipper',
      content: 'Đơn hàng không hợp lệ',
    };
    const resOrderCancel = await axiosClient.put('gotruck/ordershipper/', item);
    if (resOrderCancel.status === 'Đã hủy') {
      socketClient.emit('shipper_cancel', resOrderCancel);
      setListOrderNotify([]);
      setHaveOrder(false);
      setShowMessage(false);
      onSocketReceiveOrder();
    }
  };

  return (
    <View style={styles.order}>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Mã đơn</Text>
        <Text style={styles.content}>{order.id_order}</Text>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Từ</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.from_address.address}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Giao tới</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.to_address.address}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Ghi chú</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.note}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.long]}>Người nhận</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.to_address.name}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.long]}>Số điện thoại</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{order.to_address.phone}</Text>
        </ReadMore>
      </View>
      <View style={styles.inlineBetween}>
        {order.status == 'Chưa nhận' || order.status == 'Đã nhận' ? (
          <MyButton
            type={'small'}
            text={'Hủy đơn'}
            btnColor={'red'}
            txtColor={'white'}
            action={() => hanldeCancelOrder()}
          />
        ) : order.status == 'Đang giao' ? (
          <MyButton
            type={'medium'}
            text={'Xem vị trí shipper'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            style={styles.customerButton}
            action={() => navigation.navigate('LocationShipper')}
          />
        ) : order.status == 'Đã giao' ? (
          <MyButton
            type={'small'}
            text={'Đánh giá'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
          />
        ) : (
          <View></View>
        )}

        <MyButton
          type={'small'}
          text={'Xem'}
          btnColor={'#0DBEBE'}
          txtColor={'white'}
          action={() => {
            navigation.navigate('OrderDetail', {
              order: order,
            });
          }}
        />
      </View>
    </View>
  );
}
