# Thống kê công cụ và thư viện sử dụng trong dự án

Dự án Todo App được xây dựng với những công nghệ tiên tiến nhất của hệ sinh thái React Native, đảm bảo tính hiện đại, hiệu năng cao và đáp ứng toàn bộ các yêu cầu của Assignment 1 môn MMA301.

Dưới đây là danh sách các công cụ đã được sử dụng:

## 1. Core Framework
- **React Native (v0.85)**: Nền tảng cốt lõi để phát triển ứng dụng di động đa nền tảng.
- **Expo (SDK 56)**: Toolchain và framework giúp việc khởi tạo, phát triển và build ứng dụng React Native trở nên cực kỳ dễ dàng.

## 2. UI & Styling
- **NativeWind (v4)**: Cho phép sử dụng Tailwind CSS ngay trong React Native. Việc dùng class thay vì `StyleSheet` mang lại tốc độ phát triển giao diện nhanh chóng, mã nguồn sạch sẽ và giao diện rất nhất quán.
- **Lucide React Native**: Bộ icon mã nguồn mở hiện đại, đẹp mắt và tối giản, thay thế hoàn hảo cho `react-native-vector-icons`.
- **Glassmorphism & Dark Mode**: Sử dụng CSS Variables (tích hợp qua NativeWind v4) giúp ứng dụng dễ dàng chuyển đổi qua lại giữa giao diện Sáng và Tối cực kỳ mượt mà.

## 3. Navigation
- **React Navigation Stack (`@react-navigation/native-stack`)**: Thư viện điều hướng tiêu chuẩn của React Native. Thay vì sử dụng Modal (Popup) cho các tác vụ thêm/sửa, ứng dụng dùng Stack Navigator, đáp ứng đúng yêu cầu "mỗi chức năng là một screen riêng biệt".

## 4. Storage (Lưu trữ)
- **AsyncStorage (`@react-native-async-storage/async-storage`)**: Hệ thống lưu trữ dữ liệu dạng key-value, không đồng bộ (asynchronous) và bền vững (persistent). Được sử dụng để lưu danh sách Todo vào bộ nhớ điện thoại (dữ liệu không bị mất đi khi đóng app).

## 5. Animation (Trả lời cho câu hỏi "Có gì hỗ trợ animation như GSAP không?")
- **React Native Reanimated (v4)**: Engine animation mạnh mẽ nhất của React Native, thực thi animation trực tiếp trên UI Thread thay vì JS Thread để tránh giật lag (đạt 60-120 fps).
- **Moti**: Một thư viện wrap lại Reanimated, cung cấp API cực kỳ đơn giản giống như *Framer Motion* trên nền web. Trong app này, Moti được dùng để làm hiệu ứng fade-in, trượt lên (slide up) khi thêm một Todo mới và hiệu ứng co lại, mờ đi khi xóa (exit animation).

## Tổng kết ưu điểm kiến trúc
- Không sử dụng các thành phần (Component) cũ kĩ.
- Code được chia thành các Screen và Component nhỏ (như `TodoItem.js`), giúp dễ bảo trì.
- Hỗ trợ tốt trên cả iOS và Android mà không cần phải viết code riêng biệt.
