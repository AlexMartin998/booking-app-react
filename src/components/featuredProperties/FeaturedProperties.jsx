import { useFetch } from '../../hooks';
import './featuredProperties.css';

export const FeaturedProperties = () => {
  const { data, loading } = useFetch(
    '/hotels?featured=true&limit=4&min=10&max=240'
  );

  const { hotels } = data;

  return (
    <div className="fp">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {hotels?.map(item => (
            <div className="fpItem" key={item.id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>8.9</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
