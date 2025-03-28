'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import { ProgressLog } from '@/lib/types';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function AdminProgressPage() {
  useProtectedRoute(true);
  const [logs, setLogs] = useState<ProgressLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await adminApi.getProgressLogs();
      setLogs(data ?? []);
      setLoading(false);
    };

    fetchLogs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Delete this progress log?');
    if (!confirmDelete) return;

    const success = await adminApi.deleteProgressLog(id);
    if (success) {
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } else {
      alert('Failed to delete progress log.');
    }
  };

  if (loading) return <p>Loading progress logs...</p>;

  return (
    <div className="container">
      <h1>Manage Progress Logs</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Value</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.user.email}</td>
              <td>{log.exercise.name}</td>
              <td>{new Date(log.date).toLocaleDateString()}</td>
              <td>{log.sets}x{log.reps} @ {log.weight}kg</td>
              <td>{log.workout ? new Date(log.workout.date).toLocaleDateString() : '-'}</td>
              <td>
                <button onClick={() => handleDelete(log.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
