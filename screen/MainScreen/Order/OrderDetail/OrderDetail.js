import styles from './stylesOrderDetail';
import stylesGlobal from '../../../../global/stylesGlobal';
import MyButton from '../../../../components/MyButton/MyButton';

import { View, Text, ScrollView, BackHandler, Linking, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Foundation, Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MyInput from '../../../../components/MyInput/MyInput';
import axiosClient from '../../../../api/axiosClient';
import { socketClient } from '../../../../global/socket';
import { AuthContext } from '../../../../context/AuthContext';
import { Rating } from 'react-native-ratings';

export default function OrderDetail({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { order } = route.params;

  const [showModal, setShowModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [reason, setReason] = useState('');

  const handleCancelOrder = async () => {
    let item = order;
    item.status = 'Đã hủy';
    item.reason_cancel = {
      user_cancel: 'Customer',
      content: reason,
    };
    const resOrderCancel = await axiosClient.put('gotruck/ordershipper/', item);
    if (resOrderCancel.status === 'Đã hủy') {
      if (resOrderCancel.reason_cancel.user_cancel === 'Shipper') {
        Alert.alert('Thông báo', 'Đơn hàng đã bị hủy bởi tài xế');
      } else if (resOrderCancel.reason_cancel.user_cancel === 'AutoDelete') {
        Alert.alert('Thông báo', 'Đơn hàng đã xóa do quá thời hạn');
      } else if (resOrderCancel.reason_cancel.user_cancel === 'Customer') {
        socketClient.emit('customer_cancel', resOrderCancel);
      }
      setReason('');
      setValid(false);
      setShowModal(false);
      navigation.goBack();
    }
  };

  const handleCallPhone = () => {
    if (order?.shipper?.id_shipper?.phone) {
      Linking.openURL(`tel:${order.shipper.id_shipper.phone}`);
    } else {
      alert('Không thể gọi cho số điện thoại này');
    }
  };

  const handleMessage = async () => {
    const resConversation = await axiosClient.post('gotruck/conversation/', {
      id_customer: user._id,
      id_shipper: order?.shipper?.id_shipper?._id,
      id_form: order?._id,
      form_model: 'Order',
    });
    socketClient.emit('send_message', { id_receive: order?.shipper?.id_shipper?._id });
    navigation.navigate('ChatRoom', { item: resConversation });
  };

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      setShowModal(false);
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Mã đơn */}
        <View style={styles.inline}>
          <Text style={styles.label}>Mã đơn:</Text>
          <Text style={styles.contentHeader}>{order.id_order}</Text>
        </View>
        {/* Tài xế */}
        <View style={styles.inline}>
          <Text style={styles.label}>Tài xế nhận đơn:</Text>
          <Text style={styles.contentHeader}>
            {order?.shipper?.id_shipper ? (
              order.shipper.id_shipper.name
            ) : (
              <Text style={{ fontStyle: 'italic' }}>Chưa có</Text>
            )}
          </Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.label}>Biển số xe:</Text>
          <Text style={styles.contentHeader}>
            {order?.shipper?.truck ? (
              order.shipper.truck.license_plate
            ) : (
              <Text style={{ fontStyle: 'italic' }}>Chưa có</Text>
            )}
          </Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.contentHeader}>
            {order?.shipper?.id_shipper.phone ? (
              order.shipper.id_shipper.phone
            ) : (
              <Text style={{ fontStyle: 'italic' }}>Chưa có</Text>
            )}
          </Text>
          {order?.shipper?.id_shipper.phone &&
            (order.status === 'Đã nhận' || order.status === 'Đang giao') && (
              <>
                <Feather
                  style={{ marginLeft: 15 }}
                  name="message-square"
                  size={26}
                  color="black"
                  onPress={() => handleMessage()}
                />

                <Feather
                  style={{ marginLeft: 15 }}
                  name="phone"
                  size={26}
                  color="black"
                  onPress={() => handleCallPhone()}
                />
              </>
            )}
        </View>
        {order.rate_shipper && (
          <>
            <View style={[styles.inline]}>
              <Text style={styles.label}>Đánh giá:</Text>
              <Rating
                type="custom"
                imageSize={25}
                ratingCount={5}
                startingValue={order.rate_shipper.star}
                tintColor="white"
                ratingBackgroundColor={stylesGlobal.lightDarkGrey}
                readonly
                style={{ paddingLeft: 10 }}
              />
            </View>
            <View style={[styles.inline]}>
              <Text style={styles.label}>Nội dung đánh giá:</Text>
              <Text style={styles.contentHeader}>{order.rate_shipper.content}</Text>
            </View>
          </>
        )}
        {/* Ngưởi gửi */}
        <View style={[styles.inline, { marginTop: 20 }]}>
          <Foundation name="record" size={24} color="#0DBEBE" style={{ width: 30 }} />
          <Text style={styles.label}>Người gửi:</Text>
        </View>
        <Text style={styles.content}>
          {order.from_address.name +
            '\n' +
            order.from_address.address +
            '\n' +
            order.from_address.phone}
        </Text>
        {/* Người nhận */}
        <View style={[styles.inline, { marginTop: 20 }]}>
          <Ionicons name="md-location-sharp" size={24} color="red" style={{ width: 30 }} />
          <Text style={styles.label}>Người nhận:</Text>
        </View>
        <Text style={styles.content}>
          {order.to_address.name + '\n' + order.to_address.address + '\n' + order.to_address.phone}
        </Text>
        {/* Ghi chú */}
        <Text style={[styles.label, { marginTop: 20 }]}>Ghi chú:</Text>
        <ScrollView style={styles.viewNote} showsVerticalScrollIndicator={false}>
          <Text style={styles.viewNote.txtNote}>{order.note}</Text>
        </ScrollView>
        {/* Thông tin còn lại */}
        <View style={{ marginTop: 20, paddingBottom: 20 }}>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Khoảng cách:</Text>
            <Text style={styles.content}>{order.distance} km</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Thời gian dự kiến:</Text>
            <Text style={styles.content}>{order.expectedTime} phút</Text>
          </View>
          <View style={styles.inline}>
            <Text style={styles.labelFooter}>Chi phí vận chuyển:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {order.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'}
            </Text>
          </View>
        </View>
        {order.status == 'Đã hủy' ? (
          <View style={{ paddingBottom: 20 }}>
            <View style={styles.inline}>
              <Text style={[styles.labelFooter]}>Lý do hủy:</Text>
              <Text style={styles.content}>{order?.reason_cancel?.content}</Text>
            </View>
            <View style={styles.inline}>
              <Text style={[styles.labelFooter]}>Người hủy:</Text>
              <Text style={styles.content}>
                {order?.reason_cancel?.user_cancel === 'AutoDelete'
                  ? 'Tự động xóa'
                  : order?.reason_cancel?.user_cancel === 'Shipper'
                  ? 'Tài xế'
                  : 'Khách hàng'}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
      {order.status == 'Chưa nhận' || order.status == 'Đã nhận' ? (
        <View style={styles.viewButton}>
          <MyButton
            type={'large'}
            text={'Hủy đơn'}
            btnColor={'red'}
            txtColor={'white'}
            action={() => setShowModal(true)}
          />
        </View>
      ) : order.status == 'Đã giao' && !order.rate_shipper ? (
        <View style={styles.viewButton}>
          <MyButton
            type={'large'}
            text={'Đánh giá'}
            btnColor={stylesGlobal.mainGreen}
            txtColor={'white'}
            onPress={() => navigation.navigate('ReivewShipper', { item: order })}
          />
        </View>
      ) : null}
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
                action={() => handleCancelOrder()}
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
  );
}
