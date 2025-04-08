import axios from 'axios';
import {AuthClient} from './authClient';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://87.228.17.71/api',
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                const access_token = await AuthClient.refresh();
                instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

                return instance(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        } else {
            throw error.response.data as IError;
        }
    }
);

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');

    const auth = token ? `Bearer ${token}` : '';
    config.headers['Authorization'] = auth;
    return config;
});

export default instance;
