import Head from 'next/head'
import Footer from '@components/Footer';
import NavBar from '@components/NavBar';

interface ILayoutProps {
  title?: String;
}

const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  const titleText = title ? `Taste Lynx | ${title}` : `Taste Lynx`;

  return (
    <>
      <Head>
        <title>{titleText}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      { children }
      <Footer />
    </>
  )
}

export default Layout;