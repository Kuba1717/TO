import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();


const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        'Content-Type':'application/json'
    }
});


export function AuthProvider({children}){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))||null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken')||null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken')||null);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);


    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            config => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await refreshTokenRequest();
                        setAccessToken(response.accessToken);
                        setRefreshToken(response.refreshToken);
                        localStorage.setItem('accessToken', response.accessToken);
                        localStorage.setItem('refreshToken', response.refreshToken);

                        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
                        return api(originalRequest);

                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
        },[accessToken]);

        const getUserInfoFromToken = (token)=>{
            if(!token) return null;
            try {
              const payload = token.split('.')[1];
              const decoded = JSON.parse(atob(payload));

              return {
                  email: decoded.sub,
                  roles: decoded.roles || [],
                  exp: decoded.exp
              };
            }catch(error){
                console.error('Error decoding token:',error);
                return null;
            }
        };

        const refreshTokenRequest = async ()=> {
            if(!refreshToken){
                throw new Error('No refresh token avail');
            }
            const  response = await api.post('api/auth/refresh',{
                refreshToken: refreshToken
            });

            return response.data;
        }

        const register = async(username, email, password) => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.post('api/auth/register', {
                    username, email, password
                });
                return response.data;
            } catch (error) {
                setError(error.response?.data?.message || 'Registration failed')
                throw error;
            } finally {
                setLoading(false);
            }
        };



    const login = async(email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('api/auth/login', {
                email, password
            });

            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            const userInfo = getUserInfoFromToken(newAccessToken);
            setUser(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo));
            setIsAuthenticated(true);

            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed')
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async() => {
        try {
            if (refreshToken && user?.email) {
                await api.post('api/auth/logout', {
                    email: user.email,
                    refreshToken: refreshToken
                }, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuth();
        }
    };

    const clearAuth = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);

        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role) || false;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                error,
                login,
                logout,
                register,
                hasRole,
                api
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
export { api };
