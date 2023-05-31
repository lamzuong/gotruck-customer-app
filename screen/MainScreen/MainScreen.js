import { publicRoutes } from './routes/routes';
import { back } from '../../global/functionGlobal';
import stylesGlobal from '../../global/stylesGlobal';
import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, BackHandler, View, Text } from 'react-native';
import { socketClient } from '../../global/socket';
import { AuthContext } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { LoginSuccess } from '../../context/AuthAction';
const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const { dispatch, user } = useContext(AuthContext);

  //----------Back Button----------
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Thông báo', 'Bạn có muốn thoát ứng dụng không ?', [
        {
          text: 'Không',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Có', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  //------------------------------

  useEffect(() => {
    socketClient.off('block_account');
    socketClient.on('block_account', async (data) => {
      if (user._id === data.id_receive) {
        if (!user.block) {
          Alert.alert(
            'Thông báo',
            'Tài khoản của bạn đã bị khóa\nBạn sẽ không thể tạo đơn hàng mới đến khi tài khoản được mở khóa ',
          );
        } else {
          Alert.alert('Thông báo', 'Tài khoản của bạn đã được mở khóa');
        }
        const userLogin = await axiosClient.get('/gotruck/auth/user/' + user.phone);
        dispatch(LoginSuccess(userLogin));
      }
    });
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
      }}
    >
      {publicRoutes.map((route, index) => {
        return (
          <Tab.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={{
              headerShown: route.header,
              tabBarLabel: () => null,
              tabBarHideOnKeyboard: true,
              tabBarIcon: ({ focused }) => (focused ? route.iconActive : route.iconInactive),
              headerTitle: () => (
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    {route.title}
                  </Text>
                </View>
              ),
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: stylesGlobal.mainGreen,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
