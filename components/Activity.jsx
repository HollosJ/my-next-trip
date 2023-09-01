import { useState } from 'react';
import ActivityForm from './ActivityForm';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const Activity = ({ activity, onSave, handleDeleteActivity }) => {
  const [formShowing, setFormShowing] = useState(false);

  const handleSave = (editedActivity) => {
    onSave(editedActivity);
  };

  return (
    <div className="text-black rounded">
      {/* Show activity details */}
      {formShowing ? (
        <ActivityForm
          activity={activity}
          onSave={handleSave}
          setFormShowing={setFormShowing}
        />
      ) : (
        <div className="relative flex border-2 rounded">
          <div className="grid flex-1 p-4">
            <h3 className="text-lg font-bold">{activity.title}</h3>
            {activity.location && <span>{activity.location}</span>}
            {activity.notes && <p className="opacity-75">"{activity.notes}"</p>}
          </div>

          <div className="grid gap-2 p-4 border-l-2">
            <button
              className="underline"
              onClick={() => handleDeleteActivity(activity._id)}
            >
              <TrashIcon className="w-6 h-6 text-red-400 transition hover:opacity-75" />
            </button>
            <button className="underline" onClick={() => setFormShowing(true)}>
              <PencilSquareIcon className="w-6 h-6 text-green-400 transition hover:opacity-75" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
