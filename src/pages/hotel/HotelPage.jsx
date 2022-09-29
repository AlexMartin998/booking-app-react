import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer, Header, MailList, Navbar, Reserve } from '../../components';
import { useAuth, useFetch, useSearch } from '../../hooks';
import './hotel.css';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}

export const HotelPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const id = useLocation().pathname.split('/').at(-1);
  const { dates, options } = useSearch();

  const days = dayDifference(dates?.[0]?.endDate, dates?.[0]?.startDate);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`/hotels/find/${id}`);
  const { hotel } = !!data.ok && data;

  const handleImgClick = i => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = direction => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber =
        slideNumber === 0 ? hotel?.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === hotel?.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleReserve = () => {
    if (!user?.uid) return navigate('/', { replace: true });

    setOpenModal(true);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <i
                className="fa-solid fa-circle-xmark close"
                onClick={() => setOpen(false)}
              ></i>
              <i
                className="fa-solid fa-circle-left arrow"
                onClick={() => handleMove('l')}
              ></i>
              <div className="sliderWrapper">
                <img
                  src={hotel?.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <i
                className="fa-solid fa-circle-right arrow"
                onClick={() => handleMove('r')}
              ></i>
            </div>
          )}

          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{hotel?.name}</h1>
            <div className="hotelAddress">
              <i className="fa-solid fa-location-dot"></i>
              <span>{hotel?.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {hotel?.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotel?.cheapestPrice} at this property and get
              a free airport taxi
            </span>
            <div className="hotelImages">
              {hotel?.photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleImgClick(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotel?.title}</h1>
                <p className="hotelDesc">{hotel?.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * hotel?.cheapestPrice * options.room}</b> ({days}{' '}
                  nights)
                </h2>

                <button onClick={handleReserve}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>

          <MailList />
          <Footer />
        </div>
      )}

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};
