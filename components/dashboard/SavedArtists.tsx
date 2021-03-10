import { SimpleGrid } from '@chakra-ui/react';
import ArtistCard from '@components/dashboard/ArtistCard';
import { IArtist } from '@lib/spotify';

interface ISavedArtistProps {
  artists: IArtist[];
  refreshData: () => void;
}

const SavedArtists: React.FC<ISavedArtistProps> = ({ artists, refreshData }) => {
  const onRemoveClick = async (artist: IArtist) => {
    await fetch(`/api/artists/${artist.name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: artist
      })
    });

    console.log('refreshing from saved');
    refreshData();
  };

  return (
    <SimpleGrid columns={4} spacing={4} p="4">
      {artists.map((artist) => {
        return <ArtistCard key={artist.name} artist={artist} isSaved onStarClick={onRemoveClick} />;
      })}
    </SimpleGrid>
  );
};

export default SavedArtists;
