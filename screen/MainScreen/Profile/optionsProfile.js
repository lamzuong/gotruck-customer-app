import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';

const options = [
  {
    title: 'Địa điểm đã lưu',
    navigateTo: 'SavedPlace',
    icon: <Entypo name="location-pin" size={30} color="black" />,
  },
  {
    title: 'Hỗ trợ',
    navigateTo: 'Support',
    icon: <MaterialIcons name="support-agent" size={30} color="black" />,
  },
  {
    title: 'Đăng xuất',
    navigateTo: 'Welcome',
    icon: <Ionicons name="log-out-outline" size={30} color="red" />,
    color: 'red',
  },
];

export default options;
