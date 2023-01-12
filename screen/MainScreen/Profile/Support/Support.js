import styles from './stylesSupport';
import options from './optionsSupport';

import { View, Text, BackHandler, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

export default function Support({ navigation }) {
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
  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate(item.navigateTo);
              }}
            >
              <View>{item.icon}</View>
              <Text style={[styles.txtItem, { color: item.color }]}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        style={styles.flatList}
      />
    </View>
  );
}
