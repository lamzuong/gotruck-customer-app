import styles from './stylesHome';
import stylesGlobal from '../../../global/stylesGlobal';
import MyButton from '../../../components/MyButton/MyButton';
import advertise from './data/advertiseNews';

import { View, Text, StatusBar, ImageBackground, Image, ScrollView } from 'react-native';
import { TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.viewInput}>
            <AntDesign name="search1" size={24} color="grey" />
            <Text style={styles.txtPlaceholder}>Bạn muốn giao hàng tới đâu ?</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center' }}>
          {advertise.map((e, i) => (
            <TouchableOpacity key={i}>
              <Image source={e.img} style={styles.imgAdvertise} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={{ marginVertical: 10, alignItems: 'center' }}>
        <MyButton
          type={'large'}
          text="Lên đơn"
          btnColor={stylesGlobal.mainGreen}
          txtColor={'white'}
          iconRight={<MaterialCommunityIcons name="truck-fast" size={24} color="white" />}
          action={() => navigation.navigate('NewOrder')}
        />
      </View>
    </View>
  );
}
