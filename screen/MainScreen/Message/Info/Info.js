import styles from './stylesInfo';
import stylesGlobal from '../../../../global/stylesGlobal';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Octicons, FontAwesome, Entypo } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { useIsFocused } from '@react-navigation/native';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';

const mess = [
  {
    id: '1',
    name: 'Mở tiệc tùng mừng năm mới',
    message: {
      content:
        'Ngày cuối năm GoTruck xin tặng bạn voucher giảm 10% nếu vận chuyển trên 2.000.000 đ\n thuận tiện cho việc vận chuyển tổ chức trong dịp tất niên này trong các hoạt động ngoài trời đáng mong đợi các bạn nhé!!',
      image: [
        'https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg',
        'https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/07/Spy-x-Family-anya.jpg',
      ],
      read: true,
    },
    time: '22m',
    type: 'Advertise',
  },
  {
    id: '2',
    name: 'Tài xế xe 43-2K.12324 đã nhận đơn hàng HD20230012 của bạn',
    message: {
      content:
        'Đơn hàng HD20230012 của bạn đã được nhận bởi tài xế xe 43-2K.12324. Vui lòng giữ máy để được shipper liên lạc trao đổi thông tin! Cám ơn quý khách rất nhiều',
      image: [],
      read: false,
    },
    time: '22m',
    type: 'Order',
  },
  {
    id: '3',
    name: 'Mở tất niên, khao deal cuối năm 2023',
    message: {
      content:
        'Ngày cuối năm GoTruck xin tặng bạn voucher giảm 10% nếu vận chuyển trên 2.000.000 đ thuận tiện cho việc vận chuyển tổ chức trong dịp tất niên này trong các hoạt động ngoài trời đáng mong đợi các bạn nhé!!',
      image: [
        'https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg',
        'https://observatoriodocinema.uol.com.br/wp-content/uploads/2022/07/Spy-x-Family-anya.jpg',
      ],
      read: true,
    },
    time: '22m',
    type: 'Advertise',
  },
];
export default function Info({ navigation }) {
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getNotify = async () => {
      const res = await axiosClient.get('gotruck/notify/customer/' + user._id);
      setData(res);
    };
    getNotify();
  }, [isFocus]);

  const formatTime = (time) => {
    const dt = new Date(time);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

    return `${padL(dt.getHours())}:${padL(dt.getMinutes())} ${padL(dt.getDate())}/${padL(
      dt.getMonth() + 1,
    )}/${dt.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.itemChat}
              onPress={() => {
                navigation.navigate('InfoDetail', { item: item });
              }}
            >
              <View
                style={
                  item.type_notify === 'Discount' || item.type_notify === 'Warning'
                    ? styles.itemChat.deal
                    : styles.itemChat.order
                }
              >
                {item.type_notify === 'Discount' ? (
                  <Ionicons name="md-pricetags" size={24} color={stylesGlobal.darkOrange} />
                ) : item.type_notify === 'Normal' ? (
                  <FontAwesome name="truck" size={24} color={stylesGlobal.darkGreen} />
                ) : item.type_notify === 'Warning' ? (
                  <Entypo name="warning" size={24} color={'red'} />
                ) : item.type_notify === 'Order' ? (
                  <FontAwesome name="truck" size={24} color={stylesGlobal.darkGreen} />
                ) : null}
              </View>

              <View style={styles.itemChat.rightItem}>
                <ReadMore
                  numberOfLines={1}
                  renderTruncatedFooter={() => null}
                  renderRevealedFooter={() => null}
                >
                  <Text
                    style={item.title ? styles.itemChat.name.read : styles.itemChat.name.unread}
                  >
                    {item.title}
                  </Text>
                </ReadMore>
                <View style={styles.itemChat.viewMessage}>
                  <View style={{ width: '80%' }}>
                    <ReadMore
                      numberOfLines={1}
                      renderTruncatedFooter={() => null}
                      renderRevealedFooter={() => null}
                    >
                      <Text
                        style={[
                          item.title
                            ? styles.itemChat.viewMessage.read
                            : styles.itemChat.viewMessage.unread,
                          styles.itemChat.viewMessage.message,
                        ]}
                      >
                        {item.content}{' '}
                      </Text>
                    </ReadMore>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      item.title
                        ? styles.itemChat.viewMessage.read
                        : styles.itemChat.viewMessage.unread,
                      styles.itemChat.viewMessage.time,
                    ]}
                  >
                    {formatTime(item.createdAt)}{' '}
                  </Text>
                  {item.title ? null : <Octicons name="dot-fill" size={24} color="blue" />}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '#' + index}
        key={'#'}
      />
    </View>
  );
}
