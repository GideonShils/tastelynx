import { SimpleGrid } from '@chakra-ui/react';
import ArtistCard from '@components/dashboard/ArtistCard';
import { IArtist } from '@lib/spotify';

interface IDiscoverArtistProps {
  artists: IArtist[];
  refreshData: () => void;
}

const DiscoverArtists: React.FC<IDiscoverArtistProps> = ({ artists, refreshData }) => {
  const onSaveClick = async (artist: IArtist) => {
    await fetch(`/api/artists/${artist.name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: artist
      })
    });

    console.log('refreshing from discover');
    refreshData();
  };

  return (
    <SimpleGrid columns={4} spacing={4} p="4">
      {artists.map((artist) => {
        return <ArtistCard key={artist.name} artist={artist} onStarClick={onSaveClick} />;
      })}
    </SimpleGrid>
  );
};

export default DiscoverArtists;
