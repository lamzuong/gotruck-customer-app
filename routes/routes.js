import Waiting from "../screen/Waiting/Waiting";
import Welcome from "../screen/Welcome/Welcome";
import Login from "../screen/Login/Login";
import SignUp from "../screen/SignUp/SignUp";
import MainScreen from "../screen/MainScreen/MainScreen";

import EditProfile from "../screen/MainScreen/Profile/EditProfile/EditProfile";
import SavedPlace from "../screen/MainScreen/Profile/SavedPlace/SavedPlace";
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

  // Screen options in Profile
  { name: "EditProfile", component: EditProfile, header: false },
  { name: "SavedPlace", component: SavedPlace, header: false },
  { name: "ChangePassword", component: ChangePassword, header: false },
  { name: "Support", component: Support, header: false },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
