'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin-api';
import { Exercise } from '@/lib/types';
import styles from './page.module.css';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function AdminExercisesPage() {
  useProtectedRoute(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    categoryName: '',
  });
  const [editExerciseId, setEditExerciseId] = useState<string | null>(null);
  const [editExercise, setEditExercise] = useState({
    name: '',
    categoryName: '',
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await adminApi.getExercises(page);
      setExercises(data ?? []);
      setLoading(false);
    };
    fetchData();
  }, [page]);
  

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const created = await adminApi.createExercise({
      name: newExercise.name,
      categoryName: newExercise.categoryName,
    }) as Exercise;
  
    if (created) {
      setExercises((prev) => [...prev, created]);
      setShowForm(false);
      setNewExercise({ name: '', categoryName: '' });
    } else {
      alert('Failed to create exercise.');
    }
  };

  const handleEditClick = (exercise: Exercise) => {
    setEditExerciseId(exercise.id);
    setEditExercise({
      name: exercise.name,
      categoryName: exercise.category.name,
    });
  };
  
  const handleUpdate = async () => {
    if (!editExerciseId) return;
  
    const updated = await adminApi.updateExercise(editExerciseId, {
      name: editExercise.name,
      categoryName: editExercise.categoryName,
    }) as Exercise;
  
    if (updated) {
      setExercises((prev) =>
        prev.map((ex) => (ex.id === editExerciseId ? updated : ex))
      );
      setEditExerciseId(null);
      setEditExercise({ name: '', categoryName: '' });
    } else {
      alert('Failed to update exercise.');
    }
  };
  
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this exercise?');
    if (!confirmDelete) return;
  
    const success = await adminApi.deleteExercise(id);
    if (success !== null) {
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
    } else {
      alert('Failed to delete exercise.');
    }
  };

  const handleImageUpload = async (id: string, file: File) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG files are allowed');
      return;
    }
  
    const success = await adminApi.uploadExerciseImage(id, file);
  
    if (success) {
      alert('Image uploaded successfully!');
      window.location.reload();
    } else {
      alert('Failed to upload image.');
    }
  };  
  
  if (loading) return <p>Loading exercises...</p>;

  return (
    <div className="container">
      <h1>Manage Exercises</h1>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className={styles.createBtn}>
          + Create Exercise
        </button>
      ) : (
        <form onSubmit={handleCreate} className={styles.createForm}>
          <input
            type="text"
            placeholder="Exercise name"
            value={newExercise.name}
            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newExercise.categoryName}
            onChange={(e) => setNewExercise({ ...newExercise, categoryName: e.target.value })}
            required
          />
          <div className={styles.formButtons}>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {exercises.map((ex) =>
          editExerciseId === ex.id ? (
            <tr key={ex.id}>
              <td>
                <input
                  value={editExercise.name}
                  onChange={(e) => setEditExercise({ ...editExercise, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  value={editExercise.categoryName}
                  onChange={(e) => setEditExercise({ ...editExercise, categoryName: e.target.value })}
                />
              </td>
              <td>
              </td>
              <td>
                <button onClick={handleUpdate} className={styles.edit}>Save</button>
                <button onClick={() => setEditExerciseId(null)} className={styles.delete}>Cancel</button>
              </td>
      
            </tr>
          ) : (
            <tr key={ex.id}>
              <td>{ex.name}</td>
              <td>{ex.category.name}</td>
              <td>
                {ex.imageUrl && (
                  <img
                    src={ex.imageUrl}
                    alt={ex.name}
                    className={styles.imageThumb}
                  />
                )}
              </td>
              <td className={styles.actions}>
                <button
                  className={styles.edit}
                  onClick={() => handleEditClick(ex)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(ex.id)}
                >
                  Delete
                </button>
                <label className={styles.upload}>
                  Upload Image
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(ex.id, file);
                      }
                    }}
                  />
                </label>
              </td>
            </tr>
          )
        )}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
