'use client';

import Link from 'next/link';
import UserMenu from '../UserMenu/UserMenu';

export default function Header() {

  return (
    <header className="header">
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/exercises">Exercises</Link>
        <Link href="/newWorkouts">New Workouts</Link>
        <div className="user-wrapper">
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
