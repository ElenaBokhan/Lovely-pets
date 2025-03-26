import instance from 'Api/axiosClient';
import {AxiosResponse} from 'axios';
import {setLoginToStorage} from 'Utils/authUtils';

export interface ILoginResponse {
    access_token: string;
    refresh_token: string;
    username: string;
    id: string;
}

export interface ILoginRequest {
    email?: string;
    password?: string;
}

export interface IRegistrationRequest {
    email?: string;
    password?: string;
    username?: string;
}

export interface IRefreshRequest {
    id: string;
    refresh_token: string;
}

export class AuthClient {
    static async login({email, password}: ILoginRequest): Promise<void> {
        try {
            const result: AxiosResponse<ILoginResponse> = await instance.post('auth/login', {email, password});

            if (result.status === 200) {
                setLoginToStorage(result.data);
            }
        } catch (error) {
            throw error as IError;
        }
    }

    static async registration(userData: IRegistrationRequest) {
        try {
            const result = await instance.post('auth/registration', userData);
            // 201 - CREATED
            if (result.status === 201) {
                return true;
            }

            return false;
        } catch (error) {
            throw error;
        }
    }

    static async refresh() {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const userId = localStorage.getItem('userId');

            const result = await instance.post('auth/refresh', {
                refresh_token: refreshToken,
                id: userId,
            });
            const {access_token, refresh_token} = result.data;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            return access_token;
        } catch (error) {
            throw error;
        }
    }
}
