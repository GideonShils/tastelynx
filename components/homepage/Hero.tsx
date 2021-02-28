import { signIn } from 'next-auth/client';
import { Box, Button, Heading, Container } from "@chakra-ui/react"
import { ArrowForwardIcon  } from '@chakra-ui/icons'

const Hero = () => {
  return (
    <Box
      backgroundImage="url('/images/hero.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Container
        maxW="container.lg"
        pt="100px"
        pb="200px"
      >
        <Heading color="gray.800" as="h1" size="4xl" my="4">
          You've got great taste.
        </Heading>
        <Heading color="teal.500" as="h2" size="2xl" my="4">
          Make sure it stays up to date.
        </Heading>

        <Button
          onClick={() => signIn("spotify")}
          size="lg"
          colorScheme="teal"
          mt="6"
        >
          Get Started
          <ArrowForwardIcon />
        </Button>
      </Container>
    </Box>
  )
}

export default Hero;