import { Workout, WorkoutInput } from '../lib/types';
const BASE_URL = 'http://localhost:8000'; // or use env variable

const fetchFromApi = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  try {
    const res = await fetch(BASE_URL + url, {
      ...options,
      credentials: 'include',
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`❌ HTTP ${res.status} for ${url}`);
      return null;
    }

    if (res.status === 204) return null;

    return (await res.json()) as T;
  } catch (err) {
    console.error('❌ Network error:', url, err);
    return null;
  }
};

export class UserApi {
  async getMyWorkouts(page = 1) {
    return fetchFromApi(`/users/workouts?page=${page}`);
  }
  
  async getMyProgress() {
    return fetchFromApi(`/users/progress`);
  }

  async fetchWorkoutById(id: string) {
    return fetchFromApi<Workout>(`/workouts/${id}`);
  }

  // Create a workout
  async createWorkout(workout: WorkoutInput): Promise<Workout | null> {
    return fetchFromApi<Workout>(`/users/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    });
  }
}

export const userApi = new UserApi();