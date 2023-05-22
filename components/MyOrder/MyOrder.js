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
import { Modal } from 'react-native-paper';

export default function MyOrder({ order, setIsShowModal, isShowModal, setCancelItem }) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const hanldeCancelOrder = async () => {
    setCancelItem(order);
    setIsShowModal(!isShowModal);
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
            text={'Xem vị trí tài xế'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            style={styles.customerButton}
            action={() => navigation.navigate('LocationShipper', { order: order })}
          />
        ) : order.status == 'Đã giao' && !order.rate_shipper ? (
          <MyButton
            type={'small'}
            text={'Đánh giá'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            onPress={() => navigation.navigate('ReivewShipper', { item: order })}

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
