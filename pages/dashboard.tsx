import Layout from '@components/Layout';
import { Flex, Box } from "@chakra-ui/react"
import { getTopArtists, IArtist } from '@lib/spotify';
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import DiscoverArtists from '@components/dashboard/DiscoverArtists';
import SavedArtists from '@components/dashboard/SavedArtists';
import Sidebar from '@components/dashboard/Sidebar';
import { Page } from '@constants/dashboardConstants';
import { getFavoriteArtists } from '@lib/db';

interface IDashboardProps {
  topArtists: IArtist[],
  savedArtists: IArtist[]
}


const Dashboard: React.FC<IDashboardProps> = ({ topArtists, savedArtists }) => {
  const [activePage, setActivePage] = useState(Page.DISCOVER_ARTISTS);

  return (
    <Layout title="Dashboard" isDashboard>
      <Flex>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <Box bg="gray.100" flex="1">
          { activePage == Page.DISCOVER_ARTISTS
            ? <DiscoverArtists artists={topArtists} />
            : <SavedArtists artists={savedArtists}/>
          }
        </Box>
      </Flex>
    </Layout>
  )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const topArtists = await getTopArtists(session);
  const savedArtists = await getFavoriteArtists(session);

  return {
    props: {
      topArtists,
      savedArtists
    }
  }
}