import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Homepage from '@components/homepage/Homepage';

const Home: React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!loading && session && typeof window !== 'undefined') {
    router.push('/dashboard');
  }

  return <Homepage />;
};

export default Home;
