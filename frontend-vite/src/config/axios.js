import axios from "axios";
import localStorageService from "../services/localStorageService";
import { notification } from "antd";

axios.defaults.baseURL = "http://localhost:8000";

// add token to header of every req
axios.interceptors.request.use(
  (config) => {
    // login, register page dont need token
    if (config.url.includes("/login") || config.url.includes("/register"))
      return config;

    // for other pages add token in header for every request
    const token = localStorageService.getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// if token expire > rm token, reload page
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorageService.removeToken();
      window.location.reload(); // reload page to reset role. since token is remove role will be guest
      notification.error({
        message: "Token expired",
      });
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export default axios;
