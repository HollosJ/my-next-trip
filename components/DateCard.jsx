'use client';

import { useState } from 'react';

const DateCard = ({ trip, day, updateTrip }) => {
  const [activityFormShowing, setActivityFormShowing] = useState(false);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityLocation, setActivityLocation] = useState('');
  const [activityNotes, setActivityNotes] = useState('');

  function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function resetForm() {
    setActivityFormShowing(false);
    setActivityTitle('');
    setActivityLocation('');
    setActivityNotes('');
  }

  function addActivity() {
    let tripCopy = { ...trip };

    tripCopy.itinerary
      .find((date) => date._id === day._id)
      .activities.push({
        title: activityTitle,
        location: activityLocation,
        notes: activityNotes,
      });

    updateTrip(tripCopy);

    resetForm();
  }

  function deleteActivity(activityID) {
    // Find the activity in the day
    let activityIndex = day.activities.indexOf(
      day.activities.find((activity) => activity._id === activityID)
    );

    let tripCopy = { ...trip };

    tripCopy.itinerary
      .find((date) => date._id === day._id)
      .activities.splice(activityIndex, 1);

    updateTrip(tripCopy);
  }

  return (
    <div className="grid content-start gap-8 p-4 text-left bg-white rounded shadow-md">
      {/* Formatted date */}
      <h3 className="text-lg font-bold">{formatDate(new Date(day.date))}</h3>

      {/* Activities */}
      <div className="grid gap-4">
        {day.activities.map((activity, key) => (
          <div
            className="grid content-start p-4 bg-white border-2 rounded"
            key={key}
          >
            {/* Buttons */}
            <div className="flex gap-2 justify-self-end">
              {/* Delete Button*/}
              <button
                className="underline justify-self-end"
                onClick={() => deleteActivity(activity._id)}
              >
                Delete
              </button>
            </div>

            {/* Title */}
            <h4 className="font-bold">{activity.title}</h4>

            {/* Location (optional) */}
            {activity.location && (
              <div className="flex gap-2">
                {/* Location Icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>{activity.location}</span>
              </div>
            )}

            {/* Notes (optional) */}
            {activity.notes && (
              <div className="flex gap-2 text-slate-400">
                <span>"{activity.notes}"</span>
              </div>
            )}
          </div>
        ))}

        {/* Create new activity form or button */}
        {activityFormShowing ? (
          <form
            className="grid gap-4 p-4 rounded bg-slate-100"
            onSubmit={(e) => {
              e.preventDefault();

              addActivity();
            }}
          >
            {/* Title (required) */}
            <div className="grid">
              <label htmlFor="title">What</label>

              <input
                className="input"
                type="text"
                id="title"
                value={activityTitle}
                onChange={(e) => {
                  setActivityTitle(e.target.value);
                }}
                required
              />
            </div>

            {/* Location (optional) */}
            <div className="grid">
              <label htmlFor="location">Where?</label>

              <input
                className="input"
                type="text"
                id="location"
                value={activityLocation}
                onChange={(e) => {
                  setActivityLocation(e.target.value);
                }}
              />
            </div>

            {/* Notes (optional) */}
            <div className="grid">
              <label htmlFor="notes">Notes</label>

              <textarea
                className="input"
                value={activityNotes}
                id="notes"
                onChange={(e) => {
                  setActivityNotes(e.target.value);
                }}
                rows={5}
              />
            </div>

            <div className="flex gap-2 justify-self-end">
              <button className="button" type="button" onClick={resetForm}>
                Cancel
              </button>

              <button className="button button--primary" type="submit">
                Add Activity
              </button>
            </div>
          </form>
        ) : (
          <button
            className="button"
            onClick={() => {
              setActivityFormShowing(false);
            }}
          >
            Add New
          </button>
        )}
      </div>
    </div>
  );
};

export default DateCard;
