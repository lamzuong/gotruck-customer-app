import styles from './stylesMyOrder';
import stylesGlobal from '../../global/stylesGlobal';
import MyButton from '../MyButton/MyButton';

import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import ReadMore from 'react-native-read-more-text';

import { AuthContext } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';

export default function MyOrder({ order,btnHuy }) {
  const { user } = useContext(AuthContext);

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
          await axiosClient.put('gotruck/order', { ...temp });
          //Render lại nhưng chưa làm đc
          btnHuy()
        },
      },
    ]);
  };
  const navigation = useNavigation();
  return (
    <View style={styles.order}>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Mã đơn</Text>
        <Text style={styles.content}>{order._id}</Text>
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
