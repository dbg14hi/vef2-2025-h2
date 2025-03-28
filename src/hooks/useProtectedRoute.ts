// src/hooks/useProtectedRoute.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export const useProtectedRoute = (requireAdmin = false) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
      return;
    }

    // If admin route is required but user is not admin
    if (!isLoading && requireAdmin && user?.role !== 'admin') {
      router.replace('/');
      return;
    }
  }, [isAuthenticated, isLoading, user, router, requireAdmin]);

  return { isAuthenticated, user, isLoading };
};