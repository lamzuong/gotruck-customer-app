import styles from './stylesChatAdmin';
import stylesGlobal from '../../../../../../global/stylesGlobal';

import { View, Text, FlatList, Image, TextInput, BackHandler, Alert } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Link, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../../../context/AuthContext';
import axiosClient from '../../../../../../api/axiosClient';
import { Linking } from 'react-native';
import { Keyboard } from 'react-native';
import { socketClient } from '../../../../../../global/socket';

export default function ChatAdmin({ route }) {
  const [mess, setMess] = useState();
  const [listMessage, setListMessage] = useState([]);

  const navigation = useNavigation();

  const { item } = route.params;
  const { user } = useContext(AuthContext);

  const flatListRef = useRef();

  const getAllMessage = async () => {
    const listMess = await axiosClient.get('gotruck/conversation/message/' + item?._id);
    listMess.reverse();
    setListMessage(listMess);
  };

  const handleMessage = async () => {
    const messageSend = {
      id_conversation: item?._id,
      message: mess.trim(),
      id_sender: user._id,
      userSendModel: 'Customer',
    };
    if (mess.trim()) {
      const resMess = await axiosClient.post('gotruck/conversation/message/', {
        ...messageSend,
      });
      if (resMess.disable) {
        Alert.alert('Thông báo', 'Đơn đã xử lý xong nên không thể trò chuyện tiếp');
      } else {
        socketClient.emit('send_message', { id_receive: item.id_admin._id });
        getAllMessage();
      }
    }
    setMess('');
    Keyboard.dismiss();
  };

  function timeSince(date) {
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + ' năm trước';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' tháng trước';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' ngày trước';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' giờ trước';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' phút trước';
    }
    return 'Vừa gửi';
  }

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------

  useEffect(() => {
    getAllMessage();
  }, []);

  useEffect(() => {
    socketClient.off('message' + user._id);
    socketClient.on('message' + user._id, (data) => {
      getAllMessage();
    });
  });

  return (
    <>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.header.txtHeader}>{item.id_admin.fullname}</Text>
        <View></View>
      </View>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          inverted={true}
          ref={flatListRef}
          data={listMessage}
          renderItem={({ item, index }) => {
            return (
              <>
                {item.userSendModel == 'Customer' ? (
                  <Text style={styles.time.owner}>{timeSince(new Date(item.createdAt))}</Text>
                ) : (
                  <Text style={styles.time.shipper}>{timeSince(new Date(item.createdAt))}</Text>
                )}
                <View
                  style={
                    item.userSendModel == 'Customer'
                      ? [styles.itemChat, { justifyContent: 'flex-end' }]
                      : styles.itemChat
                  }
                >
                  {item.userSendModel == 'Customer' ? null : (
                    <Image
                      source={require('../../../../../../assets/images/logo-truck.png')}
                      style={styles.avatar}
                    />
                  )}
                  {item.userSendModel == 'Customer' ? (
                    <>
                      <View style={styles.view.owner}>
                        <Text style={styles.text.owner}>{item.message}</Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.view.shipper}>
                      <Text style={styles.text.shipper}>{item.message}</Text>
                    </View>
                  )}
                </View>
              </>
            );
          }}
          keyExtractor={(item, i) => i}
        />
        {!item?.disable ? (
          <View style={styles.viewInput}>
            <View style={styles.input}>
              <TextInput
                value={mess}
                onChangeText={(t) => setMess(t)}
                style={styles.txtInput}
                placeholder="Nhập tin nhắn..."
                numberOfLines={99}
              />
            </View>
            <Ionicons
              name="send"
              size={30}
              color={stylesGlobal.mainGreen}
              style={styles.iconSend}
              onPress={() => handleMessage()}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 20 }}></View>
        )}
      </View>
    </>
  );
}
