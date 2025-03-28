'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { workoutApi } from '@/lib/api';
import { Exercise } from '@/lib/types';

export default function ExerciseDetailPage() {
  const { id } = useParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    workoutApi
      .getExercise(`${id}`)
      .then(setExercise)
      .catch((err) => console.error('Failed to fetch exercise:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!exercise) return <div className="container"><p>Exercise not found.</p></div>;

  return (
    <div className="container">
      <h1>{exercise.name}</h1>
      <p><strong>Category:</strong> {exercise.category.name}</p>
      <p><strong>Description:</strong> {exercise.description}</p>
      {exercise.imageUrl && (
        <img
          src={exercise.imageUrl}
          alt={exercise.name}
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '4px',
            margin: '1rem 0',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      )}
    </div>
  );
}
