import axios from 'axios';

// Tạo một instance của axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Gốc API
  timeout: 10000, // Thời gian chờ tối đa (10 giây)
  headers: {
    'Content-Type': 'application/json', // Định dạng dữ liệu gửi đi
  },
});

// Thêm interceptor để tự động thêm token vào header Authorization
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi từ response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu token không hợp lệ hoặc hết hạn, xử lý tại đây
      console.error('Unauthorized: Token is invalid or expired');
    }
    return Promise.reject(error);
  }
);

export default apiClient;