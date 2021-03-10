import {
  Text,
  Avatar,
  Container,
  Flex,
  Spacer,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image
} from '@chakra-ui/react';
import { signIn } from 'next-auth/client';
import { signOut, useSession } from 'next-auth/client';

interface ILoggedInProps {
  image: string;
  name: string;
}

const LoggedIn: React.FC<ILoggedInProps> = ({ image, name }) => {
  return (
    <Flex align="center">
      <Text>{name}</Text>
      <Menu>
        <MenuButton>
          <Avatar mx="4" size="md" src={image} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

const LoggedOut = () => {
  return <Button onClick={() => signIn('spotify')}>Sign In</Button>;
};

interface INavBarProps {
  isDashboard?: boolean;
}

const NavBar: React.FC<INavBarProps> = ({ isDashboard }) => {
  const [session] = useSession();

  const userSection = session ? (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <LoggedIn name={session.user.name!} image={session.user.image!} />
  ) : (
    <LoggedOut />
  );

  return (
    <nav>
      <Container maxW={isDashboard ? '' : 'container.lg'} py="6">
        <Flex align="center">
          <Image src="/images/logo.png" width={50} mx={2} />
          <Heading as="h3" size="lg">
            Taste Lynx
          </Heading>
          <Spacer />
          {userSection}
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
