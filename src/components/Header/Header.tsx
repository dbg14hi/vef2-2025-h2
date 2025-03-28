'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/exercises', label: 'Exercises' },
    { href: '/newWorkouts', label: 'New Workouts' },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className={styles.userWrapper}>
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
