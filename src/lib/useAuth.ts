'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, clearToken } from './auth';

export function useAuth(redirectIfNotLoggedIn = true) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    } else if (redirectIfNotLoggedIn) {
      router.replace('/login');
    }
  }, []);

  return { isAuthenticated, logout: () => { clearToken(); router.push('/login'); } };
}
