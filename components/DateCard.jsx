'use client';

import { useSession } from 'next-auth/react';
import Activity from './Activity';
import ActivityForm from './ActivityForm';

const DateCard = ({ trip, day, setTrip }) => {
  const { data: session } = useSession();

  function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const handleEditActivity = (editedActivity) => {
    // Handle the logic to update the edited activity
    const editedActivityIndex = day.activities.findIndex(
      (activity) => activity._id === editedActivity._id
    );

    day.activities[editedActivityIndex] = editedActivity;

    const tripDateIndex = trip.itinerary.indexOf(
      trip.itinerary.find((date) => date._id === day._id)
    );

    trip.itinerary[tripDateIndex].activities[editedActivityIndex] =
      editedActivity;

    updateTrip(trip);
  };

  const handleAddActivity = (newActivity) => {
    // Add the new activity to the date's activities array
    const updatedActivities = [...day.activities, newActivity];

    // Find day
    const tripDateIndex = trip.itinerary.indexOf(
      trip.itinerary.find((date) => date._id === day._id)
    );

    trip.itinerary[tripDateIndex].activities = updatedActivities;

    updateTrip(trip);
  };

  const handleDeleteActivity = (activityID) => {
    // Find the activity in the day
    let activityIndex = day.activities.indexOf(
      day.activities.find((activity) => activity._id === activityID)
    );

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
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Update state with new trip
      setTrip(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid content-start gap-8 p-4 text-left bg-white rounded shadow-md">
      {/* Formatted date */}
      <h3 className="text-lg font-bold">{formatDate(new Date(day.date))}</h3>
      {/* Activities */}
      {day.activities.length > 0 && (
        <div className="grid gap-4">
          {day.activities.map((activity) => (
            <Activity
              key={activity._id}
              activity={activity}
              handleDeleteActivity={handleDeleteActivity}
              onSave={handleEditActivity}
            />
          ))}
        </div>
      )}

      <ActivityForm onSave={handleAddActivity} />
    </div>
  );
};

export default DateCard;
