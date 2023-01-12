import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const options = [
  {
    title: 'Góp ý & Khiếu nại',
    navigateTo: 'Feedback',
    icon: <MaterialIcons name="feedback" size={24} color="black" />,
  },
  {
    title: 'Trợ giúp',
    navigateTo: 'Help',
    icon: <Entypo name="help-with-circle" size={24} color="black" />,
  },
  {
    title: 'Danh sách đơn đã gửi',
    navigateTo: 'FormSupportSent',
    icon: <MaterialCommunityIcons name="playlist-check" size={24} color="black" />,
  },
];

export default options;
