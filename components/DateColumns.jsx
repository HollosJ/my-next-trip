import { useSession } from 'next-auth/react';
import DateColumn from './DateColumn';
import { toast } from 'sonner';

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
    toast('Activity added');
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
    toast('Activity edited');
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
    toast('Activity deleted');
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
      {/* Left fade effect */}

      <div className="absolute z-10 w-4 h-full bg-gradient-to-r from-slate-50 to-transparent"></div>

      {trip.itinerary ? (
        trip.itinerary.map((day, key) => (
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
      ) : (
        <LoadingColumns />
      )}

      <div className="absolute right-0 z-10 w-4 h-full bg-gradient-to-r to-slate-50 from-transparent"></div>
    </main>
  );
};

const LoadingColumns = () => {
  return (
    <main className="flex h-full overflow-x-auto whitespace-nowrap no-scrollbar">
      <LoadingColumn activityCount={2} />
      <LoadingColumn activityCount={5} />
      <LoadingColumn activityCount={4} />
      <LoadingColumn activityCount={3} />
      <LoadingColumn activityCount={1} />
      <LoadingColumn activityCount={2} />
      <LoadingColumn activityCount={3} />
    </main>
  );
};

const LoadingColumn = ({ activityCount = 3 }) => {
  return (
    <div className="inline-grid content-start no-scrollbar gap-4 p-4 min-w-[320px] max-w-[320px] border-r last:border-r-0">
      {/* Formatted date */}
      <div className="h-8 skeleton"></div>

      {/* Activities */}
      <div className="grid h-full gap-4">
        {/* Activity skeleton for each count */}
        {Array.from(Array(activityCount)).map((_, key) => (
          <div className="grid h-10 gap-4" key={key}>
            <div className="h-10 skeleton"></div>
          </div>
        ))}
      </div>

      <div className="grid">
        <div className="h-10 skeleton"></div>
      </div>
    </div>
  );
};

export default DateColumns;
