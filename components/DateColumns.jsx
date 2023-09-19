import DateColumn from './DateColumn';

const DateColumns = ({ trip, updateTrip, setTrip }) => {
  return (
    <div className="flex gap-4 px-4 py-4 overflow-x-auto no-scrollbar whitespace-nowrap">
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
