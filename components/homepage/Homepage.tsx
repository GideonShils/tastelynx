import Hero from '@components/homepage/Hero';
import Cards from '@components/homepage/Cards';
import Layout from '@components/Layout';

const Homepage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Cards />
    </Layout>
  );
};

export default Homepage;
