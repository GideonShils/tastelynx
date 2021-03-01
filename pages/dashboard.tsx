import { useSession } from 'next-auth/client';
import LoadingSpinner from '@components/LoadingSpinner';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import { IArtist } from '@api/spotify/top-artists';
import Layout from '@components/Layout';
import { Box, SimpleGrid, Container } from "@chakra-ui/react"
import ArtistCard from '@components/dashboard/ArtistCard';

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
        <Box bg="gray.100">
          <Container maxW="container.lg" py="4">
            <SimpleGrid columns={4} spacing={4}>
              { data.map(artist => {
                return <ArtistCard artist={artist} />
              }) }
            </SimpleGrid>
          </Container>
        </Box>
      )}
    </Layout>
  )
}