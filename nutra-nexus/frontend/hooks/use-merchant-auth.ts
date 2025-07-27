"use client"

import { useState, useEffect } from 'react';
import { merchantApiService, type MerchantCredentials } from '@/lib/merchant-api-service';

interface MerchantUser {
  username: string;
  role: string;
}

export function useMerchantAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<MerchantUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const isAuth = merchantApiService.isAuthenticated();
      const userData = merchantApiService.getMerchantData();
      
      setIsAuthenticated(isAuth);
      setUser(userData);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: MerchantCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const response = await merchantApiService.login(credentials);
      
      setIsAuthenticated(true);
      setUser(response.data.merchant);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    merchantApiService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
} 