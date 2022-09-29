import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '../../api';
import { useFetch, useSearch } from '../../hooks';
import './reserve.css';

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start.getTime());

  const list = [];

  while (date <= end) {
    list.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return list;
};

export const Reserve = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();
  const { dates } = useSearch();
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { rooms } = data;

  const allDates = useMemo(
    () => getDatesInRange(dates?.[0]?.startDate, dates?.[0]?.endDate),
    [dates]
  );

  const isAvailable = roomNumber => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = e => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter(item => item !== value)
    );
  };

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map(roomId => {
          const { data } = bookingApi.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });

          return data;
        })
      );

      setOpen(false);
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <i
          className="fa-solid fa-circle-xmark rClose"
          onClick={() => setOpen(false)}
        ></i>
        <span>Select your rooms:</span>

        {rooms?.length <= 0 && <span className="no-rooms">No rooms available</span>}

        {rooms?.map(room => (
          <div className="rItem" key={room?.id}>
            <div className="rItemInfo">
              <div className="rTitle">{room?.title}</div>
              <div className="rDesc">{room?.description}</div>
              <div className="rMax">
                Max people: <b>{room?.maxPeople}</b>
              </div>
              <div className="rPrice">{room?.price}</div>
            </div>

            <div className="rSelectRooms">
              {room.roomNumbers.map(roomNumber => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleReserve}
          disabled={selectedRooms.length <= 0}
          className={`rButton ${selectedRooms.length <= 0 ? 'disabled' : ''}`}
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};
