'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { workoutApi } from '@/lib/api';
import { Exercise } from '@/lib/types';
import styles from './page.module.css';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    workoutApi.getExercises(page).then((res) => {
      if (res) {
        setExercises(res.data);
        setTotalPages(res.totalPages);
      }
      setLoading(false);
    });
  }, [page]);


  if (loading) {
    return <div className={styles.message}><p>Loading exercises...</p></div>;
  }
  
  if (exercises.length === 0) {
    return <div className={styles.message}><p>No exercises found.</p></div>;
  }
  

  const filtered = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Exercises</h1>
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.search}
      />

      {filtered.length === 0 ? (
        <div className={styles.message}><p>No matching exercises found.</p></div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((exercise) => (
            <Link key={exercise.id} href={`/exercises/${exercise.id}`} className={styles.card}>
              {exercise.imageUrl && (
                <img src={exercise.imageUrl} alt={exercise.name} className={styles.image} />
              )}
              <h2>{exercise.name}</h2>
              <p>Category: {exercise.category.name}</p>
              <p>Description: {exercise.description}</p>
            </Link>
          ))}
        </div>
      )}
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
