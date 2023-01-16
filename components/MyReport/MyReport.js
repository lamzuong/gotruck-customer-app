import styles from './stylesMyReport';
import stylesGlobal from '../../global/stylesGlobal';
import MyButton from '../MyButton/MyButton';

import { View, Text } from 'react-native';
import React from 'react';
import ReadMore from 'react-native-read-more-text';
import { useNavigation } from '@react-navigation/native';

export default function MyReport({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.report}>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Mã đơn</Text>
        <Text style={styles.content}>{item.id}</Text>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Chủ đề</Text>
        <ReadMore
          numberOfLines={1}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{item.subject}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Mô tả</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{item.description}</Text>
        </ReadMore>
      </View>
      <View style={styles.inline}>
        <Text style={[styles.label, styles.label.short]}>Trạng thái</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={() => null}
          renderRevealedFooter={() => null}
        >
          <Text style={styles.content}>{item.status}</Text>
        </ReadMore>
      </View>
      <View style={styles.inlineBetween}>
        <View></View>
        <MyButton
          type={'small'}
          text={'Xem'}
          btnColor={'#0DBEBE'}
          txtColor={'white'}
          action={() => {
            navigation.navigate('FormSupportDetail', {
              item: item,
            });
          }}
        />
      </View>
    </View>
  );
}
