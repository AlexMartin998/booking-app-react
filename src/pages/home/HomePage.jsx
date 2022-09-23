import {
  Featured,
  FeaturedProperties,
  Header,
  Navbar,
  PropertyList,
} from '../../components';
import { MailList } from '../../components/mailList/MailList';
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
      </div>
    </div>
  );
};
