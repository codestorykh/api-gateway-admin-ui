// src/plugins/axios.ts

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth"; // Import the authentication store
import { RefreshTokenResponse } from "@/types/user"; // Import the type for refresh token response

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Base URL for the API
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Set content type to JSON
    Accept: "application/json", // Accept JSON responses
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore(); // Access the authentication store

    // If a token exists, add it to the Authorization header
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config; // Return the modified config
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response is successful, simply return it
    return response;
  },
  async (error) => {
    const authStore = useAuthStore(); // Access the authentication store
    const originalRequest = error.config; // The failed request config

    // Check if the error is due to an expired token (HTTP 401) and retry hasn't been attempted yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Attempt to refresh the token
        const response = await axiosInstance.post<RefreshTokenResponse>(
          "/refresh-token",
          {
            refreshToken: authStore.refreshToken, // Use the stored refresh token
          }
        );

        // Update the token in the auth store
        authStore.token = response.data.token;

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh errors (e.g., if refresh token is invalid)
        return Promise.reject(refreshError);
      }
    }

    // For other errors, reject the promise with the error
    return Promise.reject(error);
  }
);

export default axiosInstance; // Export the Axios instance
