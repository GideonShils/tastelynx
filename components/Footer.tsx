import { Container, Box, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <footer>
      <Box bg="gray.50" borderTop="1px" borderColor="gray.300">
        <Container maxW="container.lg" py="6" centerContent>
          <div>
            Created by{' '}
            <Link color="teal.500" href="http://www.gideonshils.com">
              Gideon Shils
            </Link>
          </div>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
