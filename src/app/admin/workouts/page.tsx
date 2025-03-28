'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import type { Workout } from '@/lib/types';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function AdminWorkoutsPage() {
  useProtectedRoute(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await adminApi.getWorkouts(page);
      if (res) {
        setWorkouts(res.data);
        setTotalPages(res.totalPages);
      }
      setLoading(false);
    };
  
    fetchWorkouts();
  }, [page]);
  

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this workout?');
    if (!confirmDelete) return;

    const success = await adminApi.deleteWorkout(id);
    if (success) {
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
    } else {
      alert('Failed to delete workout.');
    }
  };

  if (loading) return <p>Loading workouts...</p>;

  return (
    <div className="container">
      <h1>Manage Workouts</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Exercises</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w.id}>
              <td>{w.userId}</td>
              <td>{new Date(w.date).toLocaleDateString()}</td>
              <td>{w.exercises.length}</td>
              <td>
                <button onClick={() => handleDelete(w.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
