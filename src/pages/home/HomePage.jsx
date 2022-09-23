import { Featured, Header, Navbar, PropertyList } from '../../components';
import { FeaturedProperties } from '../../components/featuredProperties/FeaturedProperties';
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
      </div>
    </div>
  );
};
