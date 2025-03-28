// ----------------------------------
// User and Role
// ----------------------------------

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

// ----------------------------------
// Exercise & Related
// ----------------------------------

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  categoryId?: string;
  category: {
    id: string;
    name: string;
  };
}

// ----------------------------------
// Workout & Related
// ----------------------------------

export interface WorkoutExercise {
  id?: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  exercise: {
    name: string;
  };
}

export interface Workout {
  id: string;
  userId: string;
  date: string;
  exercises: WorkoutExercise[];
}

export type WorkoutInput = {
  date: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
};

// ----------------------------------
// Progress Logs
// ----------------------------------

export interface ProgressLog {
  id: string;
  date: string;
  sets: number;
  reps: number;
  weight: number;
  exercise: {
    name: string;
  };
  workout?: {
    date: string;
  };
  user: {
    email: string;
  };
}
