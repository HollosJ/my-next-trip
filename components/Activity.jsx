import { useState } from 'react';
import ActivityForm from './ActivityForm';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const Activity = ({ activity, onSave, handleDeleteActivity }) => {
  const [formShowing, setFormShowing] = useState(false);

  const handleSave = (editedActivity) => {
    onSave(editedActivity);
  };

  return (
    <div className="p-4 rounded bg-slate-50">
      {/* Show activity details */}
      {formShowing ? (
        <ActivityForm
          activity={activity}
          onSave={handleSave}
          setFormShowing={setFormShowing}
        />
      ) : (
        <div className="grid">
          <div className="flex gap-2 justify-self-end">
            <button className="underline" onClick={() => setFormShowing(true)}>
              <PencilSquareIcon className="w-6 h-6 transition text-slate-400 hover:text-slate-600" />
            </button>

            <button
              className="underline"
              onClick={() => handleDeleteActivity(activity._id)}
            >
              <TrashIcon className="w-6 h-6 transition text-slate-400 hover:text-slate-600" />
            </button>
          </div>

          <h3 className="text-lg font-bold">{activity.title}</h3>
          {activity.location && <span>{activity.location}</span>}
          {activity.notes && <p className="opacity-75">"{activity.notes}"</p>}
        </div>
      )}
    </div>
  );
};

export default Activity;
