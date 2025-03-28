'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginSchema, LoginSchema } from '@/lib/validation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setError(null);
      await login(data.email, data.password);
      router.push('/dashboard'); // Redirect after successful login
    } catch (err) {
        console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
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
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}