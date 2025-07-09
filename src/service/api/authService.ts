import { API } from '@/service/api/api';

export const login = async (credentials: { email: string; password: string; remember: boolean }) => {
    try {
        // await WEB.get(`/sanctum/csrf-cookie`);
        return API.post('/login', credentials);
    } catch (error) {
        throw error instanceof Error ? error : new Error(String(error));
    }
};

export function recoverAccount(credentials: { email: string }) {
    return API.post('/recovery', credentials);
}

export function resetPassword(credentials: { token: string; email: string; password: string; password_confirmation: string }) {
    return API.post(`/reset-password/${credentials.token}`, credentials);
}

export const register = async (credentials: { name: string; email: string; password: string }) => {
    try {
        const response = await API.post('/user', credentials);
        return Promise.resolve(response);
    } catch (error) {
        throw error instanceof Error ? error : new Error(String(error));
    }
};
