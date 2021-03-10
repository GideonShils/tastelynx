import { SimpleGrid } from "@chakra-ui/react"
import ArtistCard from '@components/dashboard/ArtistCard';
import { IArtist } from '@lib/spotify';

interface IDiscoverArtistProps {
  artists: IArtist[]
}

const DiscoverArtists: React.FC<IDiscoverArtistProps> = ({ artists }) => {
  const onSaveClick = (artist: IArtist) => {
    fetch(`/api/artists/${artist.name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: artist
      })
    })
  }

  return (
    <SimpleGrid columns={4} spacing={4} p='4'>
      { artists.map(artist => {
        return <ArtistCard key={artist.name} artist={artist} onStarClick={ onSaveClick }/>
      }) }
    </SimpleGrid>
  )
}

export default DiscoverArtists;
