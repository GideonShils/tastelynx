import { useSession } from 'next-auth/client';
import LoadingSpinner from '@components/LoadingSpinner';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import { IArtist } from '@api/spotify/top-artists';
import Footer from '@components/Footer';
import Layout from '@components/Layout';



export default function Dashboard() {
  const [ session, loading ] = useSession();
  const router = useRouter();

  if (!loading && !session && typeof window !== 'undefined') {
    router.push('/');
  }

  const { data, error } = useSWR<IArtist[]>('/api/spotify/top-artists', fetcher)


  if (!data) {
    return null;
  }

  return (
    <Layout title="Dashboard">
      { loading ? <LoadingSpinner /> : (
        <div>
          { data.map(artist => {
            return (
              <div key={artist.name}>
                {artist.name}
              </div>
            );
          }) }
        </div>
      )}
    </Layout>
  )
}