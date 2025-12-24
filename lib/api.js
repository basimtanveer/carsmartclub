// API configuration utility
// This ensures all API calls use the correct base URL
// Uses relative path '/api' which works with Next.js custom server
// Can be overridden with NEXT_PUBLIC_API_BASE_URL env variable
export const API_BASE_URL = 
  typeof window !== 'undefined' 
    ? (process.env.NEXT_PUBLIC_API_BASE_URL || '/api')
    : (process.env.NEXT_PUBLIC_API_BASE_URL || '/api');

export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};




