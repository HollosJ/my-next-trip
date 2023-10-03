import { useSession } from 'next-auth/react';
import DateColumn from './DateColumn';

const DateColumns = ({ trip, setTrip }) => {
  const { data: session } = useSession();

  const handleAddActivity = (day, newActivity) => {
    // Add the new activity to the date's activities array
    const updatedActivities = [...day.activities, newActivity];

    // Find day
    const tripDateIndex = trip.itinerary.indexOf(
      trip.itinerary.find((date) => date._id === day._id)
    );

    trip.itinerary[tripDateIndex].activities = updatedActivities;

    updateTrip(trip);
  };

  const handleEditActivity = (day, editedActivity) => {
    // Handle the logic to update the edited activity
    const editedActivityIndex = day.activities.findIndex(
      (activity) => activity._id === editedActivity._id
    );

    // Update the day with the edited activity
    day.activities[editedActivityIndex] = editedActivity;

    // Find day
    const tripDateIndex = trip.itinerary.indexOf(
      trip.itinerary.find((date) => date._id === day._id)
    );

    // Update the trip with the edited activity
    trip.itinerary[tripDateIndex].activities[editedActivityIndex] =
      editedActivity;

    updateTrip(trip);
  };

  const handleDeleteActivity = (day, activityID) => {
    // Find the activity in the day
    let activityIndex = day.activities.indexOf(
      day.activities.find((activity) => activity._id === activityID)
    );

    // Remove the activity from the day
    let tripCopy = { ...trip };

    tripCopy.itinerary
      .find((date) => date._id === day._id)
      .activities.splice(activityIndex, 1);

    updateTrip(tripCopy);
  };

  const updateTrip = async (newTrip) => {
    // Update database with PATCH request
    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/trips/${newTrip._id}`,
        { method: 'PATCH', body: JSON.stringify(trip) }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok...');
      }

      const data = await response.json();

      // Update state with new trip
      setTrip(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex h-full overflow-x-auto whitespace-nowrap no-scrollbar">
      {trip.itinerary
        ? trip.itinerary.map((day, key) => (
            <DateColumn
              trip={trip}
              day={day}
              key={key}
              handleAddActivity={handleAddActivity}
              handleEditActivity={handleEditActivity}
              handleDeleteActivity={handleDeleteActivity}
              setTrip={setTrip}
            />
          ))
        : 'Loading...'}
    </main>
  );
};

export default DateColumns;
