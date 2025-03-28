'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerSchema, RegisterSchema } from '@/lib/validation';
import { useAuth } from '@/lib/auth-context';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setError(null);
      await registerUser(data.email, data.password, data.name);
      router.push('/login'); // Redirect after successful registration
    } catch (err) {
        console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            {...register('name')}
            placeholder="Enter your name"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            {...register('email')}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            {...register('password')}
            placeholder="Enter your password"
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            {...register('confirmPassword')}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        
        <p>
          Already have an account?  
          <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}