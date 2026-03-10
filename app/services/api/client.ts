// API Client Configuration
// Handles all HTTP requests to backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Custom error class for API errors
export class APIError extends Error {
    constructor(
        message: string,
        public status: number,
        public errors?: any[]
    ) {
        super(message);
        this.name = 'APIError';
    }
}

// Generic API request function
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    // Get access token from localStorage (we'll store it there)
    const token = localStorage.getItem('accessToken');

    // Build headers
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    // Make request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include', // Important: Sends cookies (for refresh token)
    });

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
        throw new APIError(
            data.message || 'An error occurred',
            response.status,
            data.errors
        );
    }

    return data;
}

// API Methods
export const api = {
    // GET request
    get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),

    // POST request
    post: <T>(endpoint: string, body?: any) =>
        apiRequest<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        }),

    // PUT request
    put: <T>(endpoint: string, body?: any) =>
        apiRequest<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    // DELETE request
    delete: <T>(endpoint: string) =>
        apiRequest<T>(endpoint, { method: 'DELETE' }),
};