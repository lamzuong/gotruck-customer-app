import styles from './stylesDataHelp';
import { Text } from 'react-native';

const data = [
  {
    header: 'Làm sao để lên đơn giao hàng ?',
    body: (
      <Text style={styles.txtBody}>
        Bước 1: Vào trang chủ {'\n'}
        Bước 2: Chọn nút 'Lên đơn' {'\n'}
        Bước 3: Điền đầy đủ các thông tin nơi nhận hàng, nơi giao hàng, loại hàng hóa, cân nặng của
        hàng hóa, loại xe tải giao hàng, hình ảnh hàng hóa (nếu có) {'\n'}
        Bước 4: Nhấn nút tiếp theo {'\n'}
        Bước 5: Điền thông tin người gửi, người nhận, ghi chú cho tài xế (nếu có), chọn người thanh
        toán đơn hàng (người gửi hoặc người nhận) {'\n'}
        Bước 6: Nhấn nút xác nhận.{'\n'}
        Chúc mừng bạn đã hoàn thành lên đơn giao hàng
      </Text>
    ),
  },
];
export default data;
