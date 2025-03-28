'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { userApi } from '@/lib/user-api';
import type { Workout, ProgressLog } from '@/lib/types';
import styles from './page.module.css';

export default function DashboardPage() {
  useProtectedRoute();
  const { user } = useAuth();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const workoutRes = await userApi.getMyWorkouts(1);
      const progressRes = await userApi.getMyProgress();

      if (workoutRes && Array.isArray(workoutRes)) setWorkouts(workoutRes);
      if (progressRes && Array.isArray(progressRes)) setProgressLogs(progressRes);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading dashboard...</p>;
  }

  return (
    <div className="container">
      <h1>Welcome, {user?.email}!</h1>

      {user?.role === 'admin' && (
        <p>
          <Link href="/admin">Go to Admin Panel</Link>
        </p>
      )}

      <section className={styles.section}>
        <h2>Recent Workouts</h2>
        {workouts.length === 0 ? (
          <p>No workouts found.</p>
        ) : (
          <ul className={styles.list}>
            {workouts.map((w) => (
              <li key={w.id}>
                <Link href={`/workouts/${w.id}`}>
                  <strong>{new Date(w.date).toLocaleDateString()}</strong> — {w.exercises.length} exercises
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <h2>Recent Progress Logs</h2>
        {progressLogs.length === 0 ? (
          <p>No progress logs found.</p>
        ) : (
          <ul className={styles.list}>
            {progressLogs.slice(0, 5).map((log) => (
              <li key={log.id}>
                {new Date(log.date).toLocaleDateString()} — {log.exercise.name}: {log.sets}x{log.reps} @ {log.weight}kg
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
