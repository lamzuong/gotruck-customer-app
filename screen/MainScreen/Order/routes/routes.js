import NotShipper from "../NotShipper/NotShipper";
import HaveShipper from "../HaveShipper/HaveShipper";
import Shipping from "../Shipping/Shipping";
import Finished from "../Finished/Finished";
import Cancelled from "../Cancelled/Cancelled";

// Không cần đăng nhập
const publicRoutes = [
  {
    name: "NotShipper",
    component: NotShipper,
    header: false,
    title: "Chưa nhận",
  },
  {
    name: "HaveShipper",
    component: HaveShipper,
    header: false,
    title: "Đã nhận",
  },
  {
    name: "Shipping",
    component: Shipping,
    header: false,
    title: "Đang giao",
  },
  {
    name: "Finished",
    component: Finished,
    header: false,
    title: "Hoàn thành",
  },
  {
    name: "Cancelled",
    component: Cancelled,
    header: false,
    title: "Đã hủy",
  },
];
// Đăng nhập để xem được
const privateRoutes = [];
export { publicRoutes, privateRoutes };
