import styles from './stylesChatRoom';
import stylesGlobal from '../../../../../global/stylesGlobal';

import { View, Text, FlatList, Image, TextInput, BackHandler } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../../../context/AuthContext';
import axiosClient from '../../../../../api/axiosClient';

import { Keyboard } from 'react-native';

export default function ChatRoom({ route }) {
  const [mess, setMess] = useState();
  const [listMessage, setListMessage] = useState([]);
  
  const navigation = useNavigation();

  const { item } = route.params;
  const { user } = useContext(AuthContext);

  const flatListRef = useRef();

  const getAllMessage = async () => {
    const listMess = await axiosClient.get('gotruck/conversation/message/' + item._id);
    listMess.reverse();
    setListMessage(listMess);
  };

  const handleMessage = async () => {
    const messageSend = {
      id_conversation: item._id,
      message: mess,
      id_sender: user._id,
      userSendModel: 'Customer',
    };
    await axiosClient.post('gotruck/conversation/message/', {
      ...messageSend,
    });
    setMess('');
    getAllMessage();
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

  return (
    <>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.goBack()} />
        <Text style={styles.header.txtHeader}>{item.id_shipper.name}</Text>
        <View style={{ width: 24 }}></View>
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
                    <Image source={{ uri: item.id_sender.avatar }} style={styles.avatar} />
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
          keyExtractor={(item) => item._id}
        />
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
      </View>
    </>
  );
}
