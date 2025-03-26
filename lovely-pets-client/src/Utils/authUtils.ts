import {ILoginResponse} from 'Api/authClient';

export const setLoginToStorage = (loginData: ILoginResponse) => {
    const {access_token, refresh_token, username, id} = loginData;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('userName', username);
    localStorage.setItem('userId', id);
};

export const removeLoginToStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
};
