import { Button, Stack, Icon } from "@chakra-ui/react"
import { FaHeart } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { Page } from '@constants/dashboardConstants';

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
]

interface ISidebarProps {
  setActivePage: (page: Page) => void;
  activePage: Page;
}

const Sidebar: React.FC<ISidebarProps> = ({ setActivePage, activePage }) => {
  return (
    <Stack p='5' direction="column" width="xs">
      { options.map(option => {
        return (
          <Button
            justifyContent="flex-start"
            leftIcon={option.icon}
            onClick={() => setActivePage(option.page)}
            isActive={ option.page == activePage}
            key={option.title}
          >
            { option.title }
          </Button>
        )
      })}
    </Stack>
  )
}

export default Sidebar;
