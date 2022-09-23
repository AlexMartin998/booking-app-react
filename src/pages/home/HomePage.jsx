import { Featured, Header, Navbar, PropertyList } from '../../components';
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
      </div>
    </div>
  );
};
