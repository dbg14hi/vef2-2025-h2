'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="footer">
      <p>&copy; 2025 Workout Tracker</p>
      {user?.role === 'admin' && (
        <p><Link href="/admin">Admin Panel</Link></p>
      )}
    </footer>
  );
}
