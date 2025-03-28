'use client';

import { useAuth } from '@/lib/auth-context';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ProfilePage() {
  useProtectedRoute(); 
  const { user, isLoading } = useAuth();

  if (isLoading || !user) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>My Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}
