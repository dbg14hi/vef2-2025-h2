// app/page.tsx or app/index.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container">
      <h1>Workout Tracker</h1>
      <p>
        Welcome to the ultimate workout tracker. Whether you lift heavy or run far,
        we help you track your progress and crush your goals.
      </p>
      <Image
        src="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Fitness banner"
        width={400}
        height={600}
        style={{
          borderRadius: '8px',
          marginTop: '1rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    </div>
  );
}
