import styles from './stylesFormSupportSent';
import MyReport from '../../../../../components/MyReport/MyReport';

import { View, Text, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import axiosClient from '../../../../../api/axiosClient';
import { AuthContext } from '../../../../../context/AuthContext';

export default function FormSupportSent({ navigation }) {
  const [listReport, setListReport] = useState([
    {
      id: 'SP2023001',
      subject: 'Đơn hàng',
      description: 'Tài xế không giao đúng hàng so với lúc nhận hàng ở đơn hàng HD2023120',
      email: 'nunu@gmail.com',
      phone: '0963251415',
      images: [
        'https://static.wikia.nocookie.net/luffy_kun_wiki/images/8/88/Straw_Hat_Pirates%25_27_Jolly_Roger.png/revision/latest?cb=20200418133047&path-prefix=vi',
        'https://static.wikia.nocookie.net/luffy_kun_wiki/images/8/88/Straw_Hat_Pirates%25_27_Jolly_Roger.png/revision/latest?cb=20200418133047&path-prefix=vi',
        'https://static.wikia.nocookie.net/luffy_kun_wiki/images/8/88/Straw_Hat_Pirates%25_27_Jolly_Roger.png/revision/latest?cb=20200418133047&path-prefix=vi',
      ],
      idSender: 'KH2023001',
      time: '15-02-2023 3:29 P.M',
      status: 'Đã gửi',
    },
    {
      id: 'SP2023002',
      subject: 'Góp ý',
      description:
        'Tôi mong muốn có thêm nhiều sự hỗ trợ hơn từ ứng dụng để có thể tìm hiểu chính xác hơn về các đơn hàng và cac chính sách của ứng dụng',
      email: 'mzkin@gmail.com',
      phone: '0911156315',
      images: [],
      idSender: 'KH2023001',
      time: '14-02-2023 4:29 P.M',
      status: 'Đã tiếp nhận',
    },
    {
      id: 'SP2023003',
      subject: 'Tài xế',
      description:
        'Tài xế Nguyễn Văn An giao đơn hàng HD2023001 có thái độ thiếu lịch sự với khách',
      email: 'ponzone@gmail.com',
      phone: '0909151545',
      images: [],
      idSender: 'KH2023001',
      time: '12-02-2023 5:29 P.M',
      status: 'Đã xử lý',
    },
  ]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async function () {
      const allFeedBack = await axiosClient.get('gotruck/profile/feedback/' + user._id);
      setListReport(allFeedBack)
    }.call(this));
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 10 }}></View>
        {listReport.map((e, i) => (
          <MyReport item={e} key={i} />
        ))}
      </ScrollView>
    </View>
  );
}
