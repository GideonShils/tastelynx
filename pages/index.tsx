import { signIn, useSession } from 'next-auth/client';
import { Box, Button, Heading, Container } from "@chakra-ui/react"
import { ArrowForwardIcon  } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/Home.module.css'

const HomepageView = () => {
  return (
    <>
      <Head>
        <title>Taste Lynx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        backgroundImage="url('/images/vinyl.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Container
          maxW="container.lg"
          pt="100px"
          pb="200px"
          px="8"
        >
          <Heading as="h1" size="4xl" my="4">
            You've got great taste.
          </Heading>
          <Heading as="h2" size="2xl" my="4">
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

      <footer className={styles.footer}>
        
      </footer>
    </>
  )
}

export default function Home() {
  const [ session, loading ] = useSession();
  const router = useRouter();

  if (!loading && session && typeof window !== 'undefined') {
    router.push('/dashboard');
  }

  return (
    loading ? <LoadingSpinner /> : <HomepageView />
  )
}
