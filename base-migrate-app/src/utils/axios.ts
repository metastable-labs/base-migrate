import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://7980-102-217-172-30.ngrok-free.app',
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
    }
    return Promise.reject(error);
  },
);

const setTokenHeader = async (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { axiosInstance, setTokenHeader };
