import styles from "../../../../global/stylesGlobal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const icon = () => {
  return (
    <MaterialCommunityIcons name="truck" size={24} color={styles.mainGreen} />
  );
};
const types = [
  {
    label: "Xe tải trọng 1 tấn",
    value: 1,
    icon: icon,
  },
  {
    label: "Xe tải trọng 3 tấn",
    value: 3,
    icon: icon,
  },
  {
    label: "Xe tải trọng 5 tấn",
    value: 5,
    icon: icon,
  },
  {
    label: "Xe tải trọng 10 tấn",
    value: 10,
    icon: icon,
  },
  {
    label: "Xe tải trọng trên 10 tấn",
    value: 11,
    icon: icon,
  },
];
export default types;
