import styles from './stylesSavedPlace';
import MyAddress from '../../../../components/MyAddress/MyAddress';
import ButtonAdd from '../../../../components/ButtonAdd/ButtonAdd';
import stylesGlobal from '../../../../global/stylesGlobal';
import { View, Text, ScrollView, BackHandler, Alert } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axiosClient from '../../../../api/axiosClient';
import { AuthContext } from '../../../../context/AuthContext';
import MyButton from '../../../../components/MyButton/MyButton';
export default function SavedPlace({ navigation }) {
  // const address = [
  //   {
  //     id: 0,
  //     name: 'Nguyễn Văn A',
  //     phone: '0791948511',
  //     address: '12 Nguyễn Văn Bảo, P.4, Q.Gò Vấp, TP.HCM',
  //     latitude: 10.820685,
  //     longitude: 106.687631,
  //     // note: 'Trường Đại học Công Nghiệp TPHCM',
  //   },
  //   {
  //     id: 1,
  //     name: 'Lê Văn B',
  //     phone: '0912112111',
  //     address: '44/51 Lê Quang Sung, P.11, Q.6, TP.HCM',
  //     latitude: 10.751087765680198,
  //     longitude: 106.64291057824333,
  //     // note: 'Gần nhà sách Cây Gõ',
  //   },
  //   {
  //     id: 2,
  //     name: 'Trần Văn C',
  //     phone: '0359434733',
  //     address: '44/51 Lê Quang Sung, P.11, Q.6, TP.HCM',
  //     latitude: 10.751087765680198,
  //     longitude: 106.64291057824333,

  //     // note: 'Gần nhà sách Cây Gõ',
  //   },
  // ];

  const [listAddress, setListAddress] = useState([]);
  const route = useRoute();
  const { user } = useContext(AuthContext);
  const [render, setRender] = useState(false);

  const handleDeleteSavedPlace = async (item) => {
    Alert.alert('Xác nhận', 'Bạn chắc chắn muốn xóa địa điểm này ?', [
      {
        text: 'Hủy',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await axiosClient.delete('gotruck/profile/savedplace/' + item._id);
          setRender(!render);
        },
      },
    ]);
  };

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
    (async function () {
      const listsaved = await axiosClient.get('/gotruck/profile/savedplace/' + user._id);
      if (listsaved.length > 0) setListAddress(listsaved);
      else setListAddress([]);
    }.call(this));
  }, [route, render]);
  //------------------------------

  return (
    <ScrollView style={styles.container}>
      {listAddress.length > 0 ? (
        listAddress.map((e, i) => (
          <View style={styles.container2} key={i}>
            <View style={[stylesGlobal.inline, { marginBottom: 10 }]}>
              <Text style={styles.label}>Họ tên</Text>
              <Text style={styles.content}>{e.name}</Text>
            </View>
            <View style={[stylesGlobal.inline, { marginBottom: 10 }]}>
              <Text style={styles.label}>Địa chỉ</Text>
              <Text style={styles.content}>{e.address}</Text>
            </View>
            <View style={[stylesGlobal.inline, { marginBottom: 10 }]}>
              <Text style={styles.label}>Điện thoại</Text>
              <Text style={styles.content}>{e.phone}</Text>
            </View>
            <View style={stylesGlobal.inlineBetween}>
              <MyButton
                type={'small'}
                text="Xóa"
                btnColor={'red'}
                txtColor="white"
                action={() => handleDeleteSavedPlace(e)}
              />
              <MyButton
                type={'small'}
                text="Sửa"
                btnColor={'orange'}
                txtColor="white"
                action={() => {
                  navigation.navigate('FormSavedPlace', {
                    item: e,
                  });
                }}
              />
            </View>
          </View>
        ))
      ) : (
        <></>
      )}
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
