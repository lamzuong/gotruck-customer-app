import styles from './stylesChat';

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { AuthContext } from '../../../../context/AuthContext';
import axiosClient from '../../../../api/axiosClient';
import { useRoute } from '@react-navigation/native';

export default function Chat({ navigation }) {
  const [listConversation, setListConversation] = useState([]);
  const { user } = useContext(AuthContext);
  const route = useRoute()
  useEffect(() => {
    
    (async function () {
      const listConversation = await axiosClient.get('gotruck/conversation/' + user._id);
      setListConversation(listConversation);
    }.call(this));
  }, []);



  return (
    <View style={styles.container}>
      <FlatList
        data={listConversation}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate('ChatRoom', { item: item });
              }}
            >
              <Image
                source={{
                  uri: item.id_shipper.avatar,
                }}
                style={styles.itemChat.avatar}
              />
              <View style={styles.itemChat.rightItem}>
                <Text
                  style={
                    // item.message.read
                    //   ?
                    styles.itemChat.name.read
                    // : styles.itemChat.name.unread
                  }
                >
                  {item.id_shipper.name}
                </Text>
                <View style={styles.itemChat.viewMessage}>
                  <ReadMore
                    numberOfLines={1}
                    renderTruncatedFooter={() => null}
                    renderRevealedFooter={() => null}
                  >
                    <Text
                      style={[
                        // item.message.read
                          // ? 
                          styles.itemChat.viewMessage.read
                          // : styles.itemChat.viewMessage.unread,
                        ,styles.itemChat.viewMessage.message,
                      ]}
                    >
                      {item.lastMess}{" "}
                    </Text>
                  </ReadMore>

                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={[
                        // item.message.read
                          // ?
                           styles.itemChat.viewMessage.read
                          // : styles.itemChat.viewMessage.unread
                          ,
                        styles.itemChat.viewMessage.time,
                      ]}
                    >
                      {item.time}{" "}
                    </Text>
                    {/* {item.message.read ? null : (
                      <Octicons name="dot-fill" size={24} color="blue" />
                    )} */}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '@' + index}
        key={'@'}
      />
    </View>
  );
}
