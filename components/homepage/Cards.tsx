import { Center, Heading, Stack, Box, Container, Image } from '@chakra-ui/react';

const Cards: React.FC = () => {
  return (
    <Container maxW="container.lg">
      <Stack direction={{ base: 'column', md: 'row' }} align="center" px={4} pt="75px">
        <Center w={{ base: '100%', md: '50%' }}>
          <Image src="/images/music-1.svg" width={400} p={4} />
        </Center>
        <Box w={{ base: '100%', md: '50%' }}>
          <Heading color="gray.800" as="h3" size="lg" my="4">
            Discover and save artists
          </Heading>
          <Heading color="teal.500" as="h4" size="md" my="4">
            See artist suggestions based on your listening habits, or search for artists you love
          </Heading>
        </Box>
      </Stack>
      <Stack direction={{ base: 'column-reverse', md: 'row' }} align="center" px={4} py="75px">
        <Box w={{ base: '100%', md: '50%' }}>
          <Heading color="gray.800" as="h3" size="lg" my="4">
            New releases daily
          </Heading>
          <Heading color="teal.500" as="h4" size="md" my="4">
            Get recent music from your saved artists added to your Taste Lynx playist each day
          </Heading>
        </Box>
        <Center w={{ base: '100%', md: '50%' }}>
          <Image src="/images/music-2.svg" width={400} p={4} />
        </Center>
      </Stack>
    </Container>
  );
};

export default Cards;
