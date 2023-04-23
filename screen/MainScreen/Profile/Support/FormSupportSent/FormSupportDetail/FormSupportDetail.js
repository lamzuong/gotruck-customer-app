import styles from './stylesFormSupportDetail';
import stylesGlobal from '../../../../../../global/stylesGlobal';
import { sliceIntoChunks } from '../../../../../../global/functionGlobal';

import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';

export default function FormSupportDetail({ route }) {
  const { item } = route.params;

  const formatTime = (time) => {
    const dt = new Date(time);
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

    return `${padL(dt.getHours())}:${padL(dt.getMinutes())} ${padL(
      dt.getMonth() + 1,
    )}/${padL(dt.getDate())}/${dt.getFullYear()}`;
  };

  
  const renderRowImage = (arr) => {
    return (
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        {arr.map((e, i) => (
          <View style={{ width: '36%' }} key={i}>
            <Image source={{ uri: e }} style={styles.itemImage} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {/* Mã đơn */}
        {/* <View style={styles.inline}>
          <Text style={styles.label}>Mã đơn</Text>
          <Text style={styles.content}>{item.id}</Text>
        </View> */}
        {/* Ngưởi gửi */}
        {/* <View style={styles.inline}>
          <Text style={styles.label}>Mã người gửi</Text>
          <Text style={styles.content}>{item.idSender}</Text>
        </View> */}
        {/* Trạng thái */}
        <View style={styles.inline}>
          <Text style={styles.label}>Trạng thái</Text>
          <Text style={styles.content}>{item.status}</Text>
        </View>
        {/* Chủ đề */}
        <View style={styles.inline}>
          <Text style={styles.label}>Chủ đề</Text>
          <Text style={styles.content}>{item.subject}</Text>
        </View>
        {/* Ghi chú */}
        <Text style={[styles.label, { marginTop: 10 }]}>Nội dung</Text>
        <ScrollView style={styles.viewNote} showsVerticalScrollIndicator={false}>
          <Text style={styles.viewNote.txtNote}>{item.description}</Text>
        </ScrollView>
        <View style={{ marginTop: 20 }}>
          {/* Email */}
          <View style={styles.inline}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.content}>{item.email}</Text>
          </View>
          {/* Số điện thoại */}
          <View style={styles.inline}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Text style={styles.content}>{item.phone}</Text>
          </View>
          {/* Thời gian gửi */}
          <View style={styles.inline}>
            <Text style={styles.label}>Thời gian gửi</Text>
            <Text style={styles.content}>{formatTime(item.createdAt)}</Text>
          </View>
        </View>
        {/* Hình ảnh */}
        <View style={{ marginTop: 20 }}>
          <Text style={[styles.label, { width: 180 }]}>Hình ảnh minh chứng</Text>
          {item.list_image.length > 0 ? (
            sliceIntoChunks(item.list_image, 3).map((e, i) => (
              <View key={i}>{renderRowImage(e)}</View>
            ))
          ) : (
            <Text style={{ marginTop: 5, fontSize: 18, fontStyle: 'italic' }}>Không có</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
