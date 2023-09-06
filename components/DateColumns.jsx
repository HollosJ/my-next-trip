import DateColumn from './DateColumn';

const DateColumns = ({ trip, updateTrip, setTrip }) => {
  return (
    <div className="flex gap-2 py-1 my-8 overflow-x-auto whitespace-nowrap">
      {trip.itinerary
        ? trip.itinerary.map((day, key) => (
            <DateColumn
              trip={trip}
              day={day}
              key={key}
              updateTrip={updateTrip}
              setTrip={setTrip}
            />
          ))
        : 'Loading...'}
    </div>
  );
};

export default DateColumns;
