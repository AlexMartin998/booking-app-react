/* eslint-disable indent */

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './header.css';

export const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions(prev => ({
      ...prev,
      [name]:
        operation === 'i'
          ? options[name] + 1
          : (options[name] > 0 && options[name] - 1) || 0,
    }));
  };

  return (
    <div className="header">
      <div
        className={`${
          type === 'list' ? 'headerContainer listMode' : 'headerContainer'
        }`}
      >
        <div className="headerList">
          <div className="headerListItem active">
            <i className="fa-solid fa-bed"></i>
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-plane"></i>
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-car"></i>
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-bed"></i>
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <i className="fa-solid fa-taxi"></i>
            <span>Airport taxi</span>
          </div>
        </div>

        {/* Type:  */}
        {type !== 'list' && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It&apos;s Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            <button className="headerBtn">Sign in / Register</button>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <i className="fa-solid headerIcon fa-bed"></i>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                />
              </div>

              {/* Data Range: */}
              <div className="headerSearchItem">
                <i className="fa-solid headerIcon fa-calendar-days"></i>
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(
                  date[0].endDate,
                  'dd/MM/yyyy'
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                  />
                )}
              </div>

              {/* Options: */}
              <div className="headerSearchItem">
                <i className="fa-solid headerIcon fa-person"></i>
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  {`${options.adult} adult · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('adult', 'd')}
                          disabled={options.adult < 1}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('adult', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('children', 'd')}
                          disabled={options.children < 1}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('children', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('room', 'd')}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption('room', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn">Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
