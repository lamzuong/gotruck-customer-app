import Waiting from "../screen/Waiting/Waiting";
import Welcome from "../screen/Welcome/Welcome";
import Login from "../screen/Login/Login";
import SignUp from "../screen/SignUp/SignUp";
import MainScreen from "../screen/MainScreen/MainScreen";

import NewOrder from "../screen/MainScreen/Home/NewOrder/NewOrder";
import NewOrderDetail from "../screen/MainScreen/Home/NewOrderDetail/NewOrderDetail";
import SearchLocation from "../screen/MainScreen/Home/SearchLocation/SearchLocation";
import GoogleMap from "../screen/MainScreen/Home/GoogleMap/GoogleMap";
import FinishPage from "../screen/MainScreen/Home/FinishPage/FinishPage";

import OrderDetail from "../screen/MainScreen/Order/OrderDetail/OrderDetail";

import ChatRoom from "../screen/MainScreen/Message/Chat/ChatRoom/ChatRoom";
import InfoDetail from "../screen/MainScreen/Message/Info/InfoDetail/InfoDetail";

import EditProfile from "../screen/MainScreen/Profile/EditProfile/EditProfile";
import SavedPlace from "../screen/MainScreen/Profile/SavedPlace/SavedPlace";
import FormSavedPlace from "../screen/MainScreen/Profile/SavedPlace/FormSavedPlace/FormSavedPlace";
import SearchLocationSavedPlace from "../screen/MainScreen/Profile/SavedPlace/SearchLocationSavedPlace/SearchLocationSavedPlace";
import ChangePassword from "../screen/MainScreen/Profile/ChangePassword/ChangePassword";
import Support from "../screen/MainScreen/Profile/Support/Support";

// Không cần đăng nhập
const publicRoutes = [
  { name: "Waiting", component: Waiting, header: false },
  {
    name: "Welcome",
    component: Welcome,
    header: false,
    animation: "slide_from_right",
  },
  { name: "Login", component: Login, header: false },
  { name: "SignUp", component: SignUp, header: false },
  { name: "MainScreen", component: MainScreen, header: false },

  // Screen options in Home
  {
    name: "NewOrder",
    component: NewOrder,
    header: true,
    title: "Lên đơn hàng",
  },
  {
    name: "NewOrderDetail",
    component: NewOrderDetail,
    header: true,
    title: "Đơn hàng",
  },
  {
    name: "SearchLocation",
    component: SearchLocation,
    header: false,
    animation: "fade",
  },
  { name: "GoogleMap", component: GoogleMap, header: false },
  { name: "FinishPage", component: FinishPage, header: false },

  // Screen options in Order
  {
    name: "OrderDetail",
    component: OrderDetail,
    header: true,
    title: "Chi tiết đơn hàng",
  },

  // Screen options in Message
  { name: "ChatRoom", component: ChatRoom, header: false },
  { name: "InfoDetail", component: InfoDetail, header: false },

  // Screen options in Profile
  { name: "EditProfile", component: EditProfile, header: false },
  {
    name: "SavedPlace",
    component: SavedPlace,
    header: true,
    title: "Địa điểm đã lưu",
  },
  {
    name: "SearchLocationSavedPlace",
    component: SearchLocationSavedPlace,
    header: false,
    animation: "fade",
  },
  {
    name: "FormSavedPlace",
    component: FormSavedPlace,
    header: true,
    title: "Địa điểm cần lưu",
  },
  { name: "ChangePassword", component: ChangePassword, header: false },
  { name: "Support", component: Support, header: false },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
