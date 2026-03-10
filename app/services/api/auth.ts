import { api } from './client';

// TypeScript interfaces for type safety
export interface User {
    id: string;
    email: string;
    name: string;
    profilePictureUrl: string | null;
    emailVerified: boolean;
    createdAt: string;
    lastLoginAt: string | null;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        accessToken: string;
    };
}

export interface SignupResponse {
    success: boolean;
    message: string;
    data: {
        user: Omit<User, 'lastLoginAt'>;
    };
}

// Auth API calls
export const authService = {
    // Signup
    async signup(data: SignupData): Promise<SignupResponse> {
        const response = await api.post<SignupResponse>('/auth/signup', data);
        return response;
    },

    // Login
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);

        // Store access token in localStorage
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response;
    },

    // Logout
    async logout(): Promise<void> {
        await api.post('/auth/logout');

        // Clear stored data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },

    // Get current user
    async getCurrentUser(): Promise<{ success: boolean; data: { user: User } }> {
        return api.get('/auth/me');
    },

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken');
    },

    // Get stored user
    getStoredUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
};