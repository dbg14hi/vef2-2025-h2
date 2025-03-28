const BASE_URL = 'http://localhost:8000';

import { Exercise } from './types';

export class WorkoutApi {
  async fetchFromApi<T>(url: string, options?: RequestInit): Promise<T | null> {
    let response: Response;

    try {
      response = await fetch(url, {
        ...options,
        credentials: 'include', 
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

  // Get a list of exercises
  async getExercises(page = 1, limit = 12) {
    return this.fetchFromApi<{
      data: Exercise[];
      total: number;
      page: number;
      totalPages: number;
    }>(`${BASE_URL}/exercises?page=${page}&limit=${limit}`);
  }
  
  // Get a single exercise by ID
  async getExercise(id: string): Promise<Exercise | null> {
    return this.fetchFromApi<Exercise>(`${BASE_URL}/exercises/${id}`);
  }
}

export const workoutApi = new WorkoutApi();
