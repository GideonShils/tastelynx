import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router'
import Homepage from '@components/homepage/Homepage';

export default function Home() {
  const [ session, loading ] = useSession();
  const router = useRouter();

  if (!loading && session && typeof window !== 'undefined') {
    router.push('/dashboard');
  }

  return <Homepage />
}
