import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Landing Page</h1>
      <div>
        <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
}
