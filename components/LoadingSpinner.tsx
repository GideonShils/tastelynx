import { Center, Spinner } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
};

export default LoadingSpinner;
