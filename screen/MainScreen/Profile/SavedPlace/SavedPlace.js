import styles from './stylesSavedPlace';
import MyAddress from '../../../../components/MyAddress/MyAddress';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';

import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

export default function SavedPlace({ navigation }) {
  const address = [
    {
      id: 0,
      name: 'Nguyễn Văn A',
      phone: '0791948511',
      address: '12 Nguyễn Văn Bảo, P.4, Q.Gò Vấp, TP.HCM',
      latitude: 10.820685,
      longitude: 106.687631,
      // note: 'Trường Đại học Công Nghiệp TPHCM',
    },
    {
      id: 1,
      name: 'Lê Văn B',
      phone: '0912112111',
      address: '44/51 Lê Quang Sung, P.11, Q.6, TP.HCM',
      latitude: 10.751087765680198,
      longitude: 106.64291057824333,
      // note: 'Gần nhà sách Cây Gõ',
    },
    {
      id: 2,
      name: 'Trần Văn C',
      phone: '0359434733',
      address: '44/51 Lê Quang Sung, P.11, Q.6, TP.HCM',
      latitude: 10.751087765680198,
      longitude: 106.64291057824333,

      // note: 'Gần nhà sách Cây Gõ',
    },
  ];

  const [listAddress, setListAddress] = useState(address);
  const route = useRoute();

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (route.params != undefined) {
      //Khi có server thì Gọi api để setListAddress
      const { infoSavePlace } = route.params;
      setListAddress([...listAddress, infoSavePlace]);
    }
  }, [route]);
  //------------------------------

  return (
    <ScrollView style={styles.container}>
      {listAddress.map((e, i) => (
        <MyAddress item={e} key={i} />
      ))}
      <View style={{ paddingBottom: 50 }}>
        <ButtonAdd
          action={() => {
            navigation.navigate('SearchLocationSavedPlace');
          }}
        />
      </View>
    </ScrollView>
  );
}
