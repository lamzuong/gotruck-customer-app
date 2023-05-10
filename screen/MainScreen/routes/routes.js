import Home from '../Home/Home';
import Order from '../Order/Order';
import Message from '../Message/Message';
import Profile from '../Profile/Profile';
import NewOrder from '../Home/NewOrder/NewOrder';
import {
  Entypo,
  FontAwesome,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
} from '@expo/vector-icons';
import stylesGlobal from '../../../global/stylesGlobal';

// Không cần đăng nhập
const publicRoutes = [
  {
    name: 'NewOrder',
    component: NewOrder,
    header: true,
    iconActive: <Entypo name="home" size={24} color={stylesGlobal.mainGreen} />,
    iconInactive: <AntDesign name="home" size={24} color={stylesGlobal.mainGreen} />,
    title: 'Tạo đơn hàng',
  },
  {
    name: 'Order',
    component: Order,
    header: false,
    iconActive: <Ionicons name="receipt" size={24} color={stylesGlobal.mainGreen} />,
    iconInactive: <Ionicons name="receipt-outline" size={24} color={stylesGlobal.mainGreen} />,
    title: 'Đơn hàng',
  },
  {
    name: 'Message',
    component: Message,
    header: false,
    iconActive: <MaterialCommunityIcons name="bell" size={24} color={stylesGlobal.mainGreen} />,
    iconInactive: <Fontisto name="bell" size={24} color={stylesGlobal.mainGreen} />,
    title: 'Tin nhắn',
  },
  {
    name: 'Profile',
    component: Profile,
    header: false,
    iconActive: <FontAwesome name="user" size={24} color={stylesGlobal.mainGreen} />,
    iconInactive: <FontAwesome name="user-o" size={24} color={stylesGlobal.mainGreen} />,
    title: 'Tài khoản',
  },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
