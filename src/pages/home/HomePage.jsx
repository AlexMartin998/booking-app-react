import {
  Featured,
  FeaturedProperties,
  Footer,
  Header,
  MailList,
  Navbar,
  PropertyList,
} from '../../components';
import './home.css';

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />

      <div className="homeContainer">
        <Featured />

        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />

        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />

        <MailList />

        <Footer />
      </div>
    </div>
  );
};
