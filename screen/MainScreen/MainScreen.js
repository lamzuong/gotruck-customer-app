import { publicRoutes } from './routes/routes';
import { back } from '../../global/functionGlobal';
import stylesGlobal from '../../global/stylesGlobal';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, BackHandler, View, Text } from 'react-native';
const Tab = createBottomTabNavigator();

export default function MainScreen() {
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
