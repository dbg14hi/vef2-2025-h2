'use client';

import Link from 'next/link';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function AdminPage() {
  const { isLoading, user } = useProtectedRoute(true);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <p>Hello, {user?.email}! You have admin access.</p>

      <ul>
        <li><Link href="/admin/exercises">Manage Exercises</Link></li>
        <li><Link href="/admin/workouts">Manage Workouts</Link></li>
        <li><Link href="/admin/progress-logs">Manage Progress Logs</Link></li>
      </ul>
    </div>
  );
}
