import { Button, Stack, Icon, Divider } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { Page } from '@constants/dashboardConstants';
import { RepeatIcon } from '@chakra-ui/icons';


const options = [
  {
    title: 'Discover Artists',
    icon: <Icon as={IoMdPerson} />,
    page: Page.DISCOVER_ARTISTS
  },
  {
    title: 'Saved Artists',
    icon: <Icon as={FaHeart} />,
    page: Page.SAVED_ARTISTS
  }
];

interface ISidebarProps {
  setActivePage: (page: Page) => void;
  activePage: Page;
}

const Sidebar: React.FC<ISidebarProps> = ({ setActivePage, activePage }) => {
  const onUpdateClick = async () => {
    await fetch('/api/spotify/update-playlist');
  };

  return (
    <Stack p="5" direction="column" width="xs">
      {options.map((option) => {
        return (
          <Button
            justifyContent="flex-start"
            leftIcon={option.icon}
            onClick={() => setActivePage(option.page)}
            isActive={option.page == activePage}
            key={option.title}>
            {option.title}
          </Button>
        );
      })}

      <Divider mt="4" mb="4" />

      <Button
        colorScheme="teal"
        justifyContent="flex-start"
        leftIcon={<RepeatIcon />}
        onClick={onUpdateClick}>
        Update Playlist
      </Button>
    </Stack>
  );
};

export default Sidebar;
