'use client';

import { useState, useEffect } from 'react';
import { userApi } from '@/lib/user-api';
import { workoutApi } from '@/lib/api';
import type { Exercise } from '@/lib/types';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useRouter } from 'next/navigation';

export default function NewWorkoutPage() {
  const router = useRouter();
  useProtectedRoute();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState([
    { exerciseId: '', sets: 0, reps: 0, weight: 0 },
  ]);  
  const [date, setDate] = useState('');

  useEffect(() => {
    workoutApi.getExercises().then((res) => {
      if (res?.data) setExercises(res.data);
    });
  }, []);
  

  const handleAddExercise = () => {
    setSelectedExercises((prev) => [
      ...prev,
      { exerciseId: '', sets: 0, reps: 0, weight: 0 },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const isoDate = new Date(date).toISOString();
  
    const workoutPayload = {
      date: isoDate,
      exercises: selectedExercises,
    };
    const success = await userApi.createWorkout(workoutPayload);
  
    if (success) {
      alert('Workout created!');
      router.push('/dashboard');
    } else {
      alert('Failed to create workout');
    }
  };

  return (
    <div className="container">
      <h1>New Workout</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="workout-date">Workout Date:</label>
          <input
            id="workout-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {selectedExercises.map((item, index) => (
          <div key={index} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '6px' }}>
            <label>
              Exercise:
              <select
                value={item.exerciseId}
                onChange={(e) =>
                  setSelectedExercises((prev) => {
                    const updated = [...prev];
                    updated[index].exerciseId = e.target.value;
                    return updated;
                  })
                }
                required
              >
                <option value="">Select Exercise</option>
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </label>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label>
                Sets:
                <input
                  type="number"
                  min={0}
                  max={1000}
                  value={item.sets}
                  onChange={(e) =>
                    setSelectedExercises((prev) => {
                      const updated = [...prev];
                      updated[index].sets = Number(e.target.value);
                      return updated;
                    })
                  }
                  required
                />
              </label>

              <label>
                Reps:
                <input
                  type="number"
                  min={0}
                  max={1000}
                  value={item.reps}
                  onChange={(e) =>
                    setSelectedExercises((prev) => {
                      const updated = [...prev];
                      updated[index].reps = Number(e.target.value);
                      return updated;
                    })
                  }
                  required
                />
              </label>

              <label>
                Weight (kg):
                <input
                  type="number"
                  min={0}
                  max={1000}
                  value={item.weight}
                  onChange={(e) =>
                    setSelectedExercises((prev) => {
                      const updated = [...prev];
                      updated[index].weight = Number(e.target.value);
                      return updated;
                    })
                  }
                  required
                />
              </label>
            </div>
          </div>
        ))}

        {selectedExercises.length < 50 && (
          <button type="button" onClick={handleAddExercise} style={{ marginBottom: '1rem' }}>
            + Add Exercise
          </button>
        )}

        <button type="submit">Save Workout</button>
      </form>
    </div>

  );
}
