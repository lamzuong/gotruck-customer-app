import { useRoute } from '@react-navigation/native';
import React, { View, Text, Dimensions, Alert } from 'react-native';
import styles from './styleReviewShipper';
import styleReviewShipper from './styleReviewShipper';
import MyButton from '../../../../../components/MyButton/MyButton';
import MyInput from '../../../../../components/MyInput/MyInput';
import styleGlobal from '../../../../../global/stylesGlobal';
import axiosClient from '../../../../../api/axiosClient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useState } from 'react';

export default function ReviewShipper({ navigation }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const route = useRoute();

  const { item } = route.params;

  const hanldeReview = async () => {
    const orderTemp = item;
    orderTemp.rate_shipper = {
      content: content,
      star: rating,
    };
    const resReivew = await axiosClient.post('/gotruck/order/review', { order: orderTemp });
    if (resReivew) {
      navigation.goBack();
    } else {
      Alert.alert('Thông báo','Đánh giá không thàng công.\nVui lòng thử lại sau');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.lblRating}>Bạn đánh giá tài xế bao nhiêu sao</Text>
        <Rating
          type="custom"
          imageSize={35}
          ratingCount={5}
          startingValue={rating}
          tintColor="white"
          ratingBackgroundColor={styleGlobal.lightDarkGrey}
          onFinishRating={(rate) => {
            setRating(rate);
          }}
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.txtcontent}>Nội dung (nếu có)</Text>
          <MyInput
            placeholder={'Nội dung đánh giá'}
            width={Dimensions.get('window').width - 40}
            value={setContent}
            borderWidth={1}
          />
        </View>
      </View>
      <View style={styles.button}>
        <MyButton
          type={'large'}
          text={'Đánh giá'}
          btnColor={styleGlobal.mainGreen}
          txtColor={'white'}
          action={() => hanldeReview()}
        />
      </View>
    </View>
  );
}
