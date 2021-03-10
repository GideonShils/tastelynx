import Head from 'next/head'
import Footer from '@components/Footer';
import NavBar from '@components/NavBar';
import { useSession } from 'next-auth/client';
import LoadingSpinner from '@components/LoadingSpinner';

interface ILayoutProps {
  title?: String;
  isDashboard?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ title, children, isDashboard }) => {
  const [ session, loading ] = useSession();

  const titleText = title ? `Taste Lynx | ${title}` : `Taste Lynx`;

  return (
    loading ? <LoadingSpinner /> : (
      <>
        <Head>
          <title>{titleText}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar isDashboard={isDashboard}/>
        { children }
        <Footer />
      </>
    )
  )
}

export default Layout;