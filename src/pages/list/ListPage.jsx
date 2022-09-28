import { format } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import { Header, Navbar, SearchItem } from '../../components';
import { useFetch, useSearch } from '../../hooks';
import './list.css';

// TODO: Usar un Global State

export const ListPage = () => {
  const location = useLocation();
  const { state } = location;

  const [destination, setDestination] = useState(state?.destination);
  const [dates, setDates] = useState(state?.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(state?.options);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min}&max=${max}`
  );

  const { hotels } = !!data.ok && data;

  const handleSearch = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'dd/MM/yyyy'
              )} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>

              {openDate && (
                <DateRange
                  onChange={item => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <div className="lsItem">
              <label htmlFor="options">Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    onChange={e => setMin(e.target.value)}
                    type="number"
                    className="lsOptionInput"
                    min={0}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    onChange={e => setMax(e.target.value)}
                    type="number"
                    className="lsOptionInput"
                    min={0}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>

            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Resutls */}
          <div className="listResult">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {hotels?.map(item => (
                  <SearchItem key={item.id} {...item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
