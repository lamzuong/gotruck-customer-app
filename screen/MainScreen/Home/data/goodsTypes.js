import styles from "../../../../global/stylesGlobal";
import { AntDesign } from "@expo/vector-icons";

const icon = () => {
  return <AntDesign name="dropbox" size={24} color="orange" />;
};
const arr = [
  "Tổng hợp",
  "Quần áo / Giày dép",
  "Nội thất",
  "Dụng cụ y tế",
  "Thiết bị điện tử",
  "Ô tô / Xe máy",
  "Khác",
];
const types = [];
arr.forEach((e) => {
  types.push({
    label: e,
    value: e,
    icon: icon,
  });
});
export default types;
