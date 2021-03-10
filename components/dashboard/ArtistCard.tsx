import { Image, AspectRatio, Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import * as React from 'react';
import { IArtist } from '@lib/spotify';

interface IArtistCardProps {
  artist: IArtist;
  isSaved?: boolean;
  onStarClick: (artist: IArtist) => void;
}
const ArtistCard: React.FunctionComponent<IArtistCardProps> = ({
  artist,
  isSaved,
  onStarClick
}) => {
  return (
    <Box>
      <Box maxW="3xl" rounded="lg" bg="white" shadow="base" overflow="hidden">
        <Flex align="center" justify="space-between" px="4" py="2">
          <Text as="h3" fontWeight="bold" fontSize="sm">
            {artist.name}
          </Text>
          <Button
            variant={isSaved ? 'solid' : 'outline'}
            colorScheme={isSaved ? 'yellow' : ''}
            onClick={() => onStarClick(artist)}>
            <StarIcon />
          </Button>
        </Flex>
        <Divider />
        <Box>
          <AspectRatio maxW="400px" ratio={1 / 1}>
            <Image src={artist.image} objectFit="cover" />
          </AspectRatio>
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistCard;
