'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { userApi } from '@/lib/user-api';
import type { Workout } from '@/lib/types';

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    userApi.fetchWorkoutById(id as string).then((data) => {
      setWorkout(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading workout...</p>;
  if (!workout) return <p>Workout not found or access denied.</p>;

  return (
    <div className="container">
      <h1>Workout Details</h1>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <h2>Exercises</h2>
      <ul>
        {workout.exercises.map((ex, idx) => (
          <li key={idx}>
            {ex.exercise.name} — Sets: {ex.sets}, Reps: {ex.reps}, Weight: {ex.weight}kg
          </li>
        ))}
      </ul>
    </div>
  );
}
