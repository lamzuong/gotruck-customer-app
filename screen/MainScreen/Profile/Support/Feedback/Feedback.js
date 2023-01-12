import styles from './stylesFeedback';
import stylesGlobal from '../../../../../global/stylesGlobal';
import MyInput from '../../../../../components/MyInput/MyInput';
import MyButton from '../../../../../components/MyButton/MyButton';
import ButtonAdd from '../../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function Feedback() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [listImage, setListImage] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Chủ đề</Text>
          <MyInput borderWidth={1} placeholder={'VD: Đơn hàng, tài xế, ...'} value={setSubject} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Mô tả</Text>
          <MyInput
            borderWidth={1}
            placeholder={'Nêu rõ sự việc'}
            height={100}
            clear={false}
            value={setDescription}
            multiline={true}
            numberOfLines={99}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Email liên lạc</Text>
          <MyInput borderWidth={1} placeholder={'VD: abc@gmail.com'} value={setEmail} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Số điện thoại liên lạc</Text>
          <MyInput borderWidth={1} placeholder={'VD: 0901234567'} value={setPhone} />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Hình ảnh minh chứng đính kèm (nếu có)</Text>
          <ButtonAdd />
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center' }}>
        <MyButton
          type={'large'}
          text={'Gửi đơn'}
          btnColor={stylesGlobal.mainGreen}
          txtColor={'white'}
        />
      </View>
    </View>
  );
}
