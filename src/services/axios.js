import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from './cookieHandling';
export const apiBaseUrl = 'https://hotel-management-dffr.onrender.com/';
const url = `${apiBaseUrl}api/`;

const instance = axios.create({
  baseURL: url,
  timeout: 10000,
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status == 404) {
      toast.error('Not authorised');
    } else if (error.response?.status == 400 && error.response?.data?.message) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error.toString());
    }
    throw error;
  },
);

instance.interceptors.request.use(request => {
  if (request.url !== 'Author/login' && request.url !== 'Author/create') {
    request.headers['Authorization'] = `Bearer ${getCookie('token')}`;
  }
  return request;
});

export default instance;
