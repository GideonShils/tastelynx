import { IArtist } from '@api/spotify/top-artists';
import { Image, AspectRatio, Box, Button, Divider, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import * as React from 'react'

interface IArtistCardProps {
  artist: IArtist,

}
const ArtistCard: React.FunctionComponent<IArtistCardProps> = ({ artist }) => {
  return (
    <Box>
      <Box
        maxW="3xl"
        rounded='lg'
        bg='white'
        shadow="base"
        overflow="hidden"
      >
        <Flex align="center" justify="space-between" px="4" py="2">
          <Text as="h3" fontWeight="bold" fontSize="sm">
            {artist.name}
          </Text>
          <Button variant="outline">
            <StarIcon />
          </Button>
        </Flex>
        <Divider />
        <Box>
          <AspectRatio maxW="400px" ratio={1 / 1}>
            <Image src={artist.image.url} objectFit="cover" />
          </AspectRatio>
        </Box>
      </Box>
    </Box>
  );
}

export default ArtistCard;