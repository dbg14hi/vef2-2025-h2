import { Exercise, ProgressLog, Workout } from './types';

const BASE_URL = 'http://localhost:8000'; // or use env

export class AdminApi {
  private get token() {
    return localStorage.getItem('token');
  }

  async fetchFromApi<T>(url: string, options?: RequestInit): Promise<T | null> {
    let response: Response;

    try {
      response = await fetch(BASE_URL + url, {
        ...options,
        credentials: 'include',
        headers: {
          ...options?.headers,
          Authorization: this.token ? `Bearer ${this.token}` : '',
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error('❌ Network error:', url, e);
      return null;
    }

    if (!response.ok) {
      console.error(`❌ HTTP ${response.status} for ${url}`);
      return null;
    }

    if (response.status === 204) return null;

    try {
      return (await response.json()) as T;
    } catch (e) {
      console.error('❌ JSON parse error:', url, e);
      return null;
    }
  }

  // GET Exercises
  async getExercises(page = 1): Promise<Exercise[] | null> {
    return this.fetchFromApi<Exercise[]>(`/admin/exercises?page=${page}`);
  }
 
  // CREATE Exercises
  async createExercise(exercise: {
    name: string;
    categoryName: string;
  }) {
    return this.fetchFromApi('/admin/exercises', {
      method: 'POST',
      body: JSON.stringify(exercise),
    });
  }

  // UPDATE Exercises
  async updateExercise(
    id: string,
    updated: { name: string; categoryName: string; }
  ) {
    return this.fetchFromApi(`/admin/exercises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
    });
  }

  // DELETE Exercises
  async deleteExercise(id: string) {
    return this.fetchFromApi('/admin/exercises', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  }

  // Upload image to a specific exercise
  async uploadExerciseImage(id: string, file: File): Promise<boolean> {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await fetch(`${BASE_URL}/admin/exercises/${id}/image`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
      credentials: 'include',
    });
  
    return response.ok;
  }  

  // GET Progress Logs
  async getProgressLogs(): Promise<ProgressLog[] | null> {
    return this.fetchFromApi('/admin/progress');
  }

  // DELETE Progress Logs
  async deleteProgressLog(id: string): Promise<boolean> {
    const result = await this.fetchFromApi(`/admin/progress/${id}`, {
      method: 'DELETE',
    });
  
    return result !== null;
  }

  // GET Workouts
  async getWorkouts(): Promise<Workout[] | null> {
    return this.fetchFromApi('/admin/workouts');
  }
  
  // DELETE Workouts
  async deleteWorkout(id: string): Promise<boolean> {
    const result = await this.fetchFromApi(`/admin/workouts/${id}`, {
      method: 'DELETE',
    });
    return result !== null;
  }
}

export const adminApi = new AdminApi();
