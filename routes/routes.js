import Welcome from '../screen/Welcome/Welcome';
import Login from '../screen/Login/Login';
import SignUp from '../screen/SignUp/SignUp';
import MainScreen from '../screen/MainScreen/MainScreen';

import NewOrder from '../screen/MainScreen/Home/NewOrder/NewOrder';
import NewOrderDetail from '../screen/MainScreen/Home/NewOrderDetail/NewOrderDetail';
import SearchLocation from '../screen/MainScreen/Home/SearchLocation/SearchLocation';
import GoogleMap from '../screen/MainScreen/Home/GoogleMap/GoogleMap';
import FinishPage from '../screen/MainScreen/Home/FinishPage/FinishPage';

import OrderDetail from '../screen/MainScreen/Order/OrderDetail/OrderDetail';
import LocationShipper from '../screen/MainScreen/Order/Shipping/LocationShipper/LocationShipper';

import ChatRoom from '../screen/MainScreen/Message/Chat/ChatRoom/ChatRoom';
import InfoDetail from '../screen/MainScreen/Message/Info/InfoDetail/InfoDetail';

import EditProfile from '../screen/MainScreen/Profile/EditProfile/EditProfile';
import SavedPlace from '../screen/MainScreen/Profile/SavedPlace/SavedPlace';
import FormSavedPlace from '../screen/MainScreen/Profile/SavedPlace/FormSavedPlace/FormSavedPlace';
import SearchLocationSavedPlace from '../screen/MainScreen/Profile/SavedPlace/SearchLocationSavedPlace/SearchLocationSavedPlace';
import Support from '../screen/MainScreen/Profile/Support/Support';
import Feedback from '../screen/MainScreen/Profile/Support/Feedback/Feedback';
import Help from '../screen/MainScreen/Profile/Support/Help/Help';
import FormSupportSent from '../screen/MainScreen/Profile/Support/FormSupportSent/FormSupportSent';
import FormSupportDetail from '../screen/MainScreen/Profile/Support/FormSupportSent/FormSupportDetail/FormSupportDetail';

import SelectLocationOnMap from '../screen/MainScreen/Home/SelectLocationOnMap/SelectLocationOnMap';
import GoogleMapSavedPlace from '../screen/MainScreen/Profile/SavedPlace/GoogleMapSavedPlace/GoogleMapSavedPlace';
import SelectSavedPlace from '../screen/MainScreen/Home/SelectSavedPlace/SelectSavedPlace';
import ReviewShipper from '../screen/MainScreen/Order/OrderDetail/ReviewShipper/ReviewShipper';
import ChatAdmin from '../screen/MainScreen/Profile/Support/FormSupportSent/ChatAdmin/ChatAdmin';
// Không cần đăng nhập
const publicRoutes = [
  {
    name: 'Welcome',
    component: Welcome,
    header: false,
    animation: 'slide_from_right',
  },
  { name: 'Login', component: Login, header: false },
  { name: 'SignUp', component: SignUp, header: false },
  { name: 'MainScreen', component: MainScreen, header: false },

  // Screen options in Home
  {
    name: 'NewOrder',
    component: NewOrder,
    header: true,
    title: 'Tạo đơn hàng',
  },
  {
    name: 'NewOrderDetail',
    component: NewOrderDetail,
    header: true,
    title: 'Đơn hàng',
  },
  {
    name: 'SearchLocation',
    component: SearchLocation,
    header: false,
    animation: 'fade',
  },
  {
    name: 'SelectLocationOnMap',
    component: SelectLocationOnMap,
    header: false,
    title: 'Chọn vị trí',
    animation: 'fade',
  },
  {
    name: 'SelectSavedPlace',
    component: SelectSavedPlace,
    header: true,
    title: 'Chọn vị trí đã lưu',
    animation: 'fade',
  },

  { name: 'GoogleMap', component: GoogleMap, header: false },
  { name: 'FinishPage', component: FinishPage, header: false },

  // Screen options in Order
  {
    name: 'OrderDetail',
    component: OrderDetail,
    header: true,
    title: 'Chi tiết đơn hàng',
  },
  { name: 'LocationShipper', component: LocationShipper, header: false },

  // Screen options in Message
  { name: 'ChatRoom', component: ChatRoom, header: false },
  { name: 'InfoDetail', component: InfoDetail, header: false },
  { name: 'ChatAdmin', component: ChatAdmin, header: false },

  // Screen options in Profile
  { name: 'EditProfile', component: EditProfile, header: false },
  {
    name: 'SavedPlace',
    component: SavedPlace,
    header: true,
    title: 'Địa điểm đã lưu',
    animation: 'slide_from_right',
  },
  {
    name: 'SearchLocationSavedPlace',
    component: SearchLocationSavedPlace,
    header: false,
    animation: 'fade',
  },
  {
    name: 'FormSavedPlace',
    component: FormSavedPlace,
    header: true,
    title: 'Địa điểm cần lưu',
    animation: 'slide_from_right',
  },
  {
    name: 'GoogleMapSavedPlace',
    component: GoogleMapSavedPlace,
    header: false,
  },
  {
    name: 'Support',
    component: Support,
    header: true,
    title: 'Hỗ trợ',
    animation: 'slide_from_right',
  },
  // Screen options in Support
  {
    name: 'Feedback',
    component: Feedback,
    header: true,
    title: 'Góp ý & Khiếu nại',
    animation: 'slide_from_right',
  },
  {
    name: 'Help',
    component: Help,
    header: true,
    title: 'Trợ giúp',
    animation: 'slide_from_right',
  },
  {
    name: 'FormSupportSent',
    component: FormSupportSent,
    header: true,
    title: 'Đơn đã gửi',
    animation: 'slide_from_right',
  },
  {
    name: 'FormSupportDetail',
    component: FormSupportDetail,
    header: true,
    title: 'Chi tiết đơn hỗ trợ',
    animation: 'slide_from_right',
  },
  {
    name: 'ReivewShipper',
    component: ReviewShipper,
    header: true,
    title: ' Đánh giá tài xế',
    animation: 'slide_from_right',
  },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
