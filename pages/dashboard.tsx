import { signOut, useSession } from 'next-auth/client';
import { Button, Avatar } from "@chakra-ui/react"
import LoadingSpinner from '../components/LoadingSpinner';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { IArtist } from '../pages/api/spotify/top-artists';

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
    loading ? <LoadingSpinner /> : (
      <div className={styles.container}>
        <main className={styles.main}>
          {session && <>
            <Avatar size="xl" src={session.user.image!} />
            Signed in as {session.user.email} <br/>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>}
          { data.map(artist => {
            return (
              <div key={artist.name}>
                {artist.name}
              </div>
            );
          }) }
        </main>
  
        <footer className={styles.footer}>
          
        </footer>
      </div>
    )
  )
}