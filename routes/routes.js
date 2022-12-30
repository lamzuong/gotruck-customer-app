import Waiting from "../screen/Waiting/Waiting";
import Welcome from "../screen/Welcome/Welcome";
import Login from "../screen/Login/Login";
import BottomTabs from "../screen/MainScreen/BottomTabs/BottomTabs";

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
  { name: "BottomTabs", component: BottomTabs, header: false },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
