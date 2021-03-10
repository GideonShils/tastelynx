import Layout from '@components/Layout';
import { Flex, Box } from '@chakra-ui/react';
import { getTopArtists, IArtist } from '@lib/spotify';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import DiscoverArtists from '@components/dashboard/DiscoverArtists';
import SavedArtists from '@components/dashboard/SavedArtists';
import Sidebar from '@components/dashboard/Sidebar';
import { Page } from '@constants/dashboardConstants';
import { getFavoriteArtists } from '@lib/db';

interface IDashboardProps {
  topArtists: IArtist[];
  savedArtists: IArtist[];
}

const Dashboard: React.FC<IDashboardProps> = ({ topArtists, savedArtists }) => {
  const router = useRouter();

  const refreshData = () => {
    console.log('triggering refrresh');
    router.replace(router.asPath);
  };

  const [activePage, setActivePage] = useState(Page.DISCOVER_ARTISTS);

  const filteredTopArtists = topArtists.filter((artist) => {
    const foundIndex = savedArtists.findIndex((savedArtist) => savedArtist.name === artist.name);
    return foundIndex < 0;
  });

  return (
    <Layout title="Dashboard" isDashboard>
      <Flex>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <Box bg="gray.100" flex="1">
          {activePage == Page.DISCOVER_ARTISTS ? (
            <DiscoverArtists refreshData={refreshData} artists={filteredTopArtists} />
          ) : (
            <SavedArtists refreshData={refreshData} artists={savedArtists} />
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const topArtists = await getTopArtists(session);
  const savedArtists = await getFavoriteArtists(session);

  return {
    props: {
      topArtists,
      savedArtists
    }
  };
};
