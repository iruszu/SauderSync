import ImageActionBanner from '@components/ImageActionBanner';
import MainSearch from '@components/mainSearch';
import Opportunities from './opportunities';

function Home() {
  //   const [opened, { toggle }] = useDisclosure();

  return (
    <div>
      <MainSearch />
      <ImageActionBanner />
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        <Opportunities />
      </div>
    </div>
  );
}

export default Home;
