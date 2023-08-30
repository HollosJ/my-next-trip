import DateCard from './DateCard';

const PointsOfInterestGrid = ({ trip, updateTrip }) => {
  return (
    <div className="grid gap-8 my-8">
      {trip.itinerary
        ? trip.itinerary.map((day, key) => (
            <DateCard trip={trip} day={day} key={key} updateTrip={updateTrip} />
          ))
        : 'Loading...'}
    </div>
  );
};

export default PointsOfInterestGrid;
