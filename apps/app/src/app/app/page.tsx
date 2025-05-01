import { auth } from '@/auth';
import { H1 } from '@/src/components/atoms/h1';

export default async function HomePage() {
  const session = await auth();
  return (
    <div>
      <H1>Home</H1>
      <p>Welcome, {session?.user?.name}.</p>
    </div>
  );
}
