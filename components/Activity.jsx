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
        <div className="relative flex whitespace-normal border-2 rounded">
          {/* Activity content */}
          <div className="grid flex-1 p-4">
            <h3 className="text-lg font-bold">{activity.title}</h3>
            {activity.location && <span>{activity.location}</span>}
            {activity.notes && <p className="opacity-75">"{activity.notes}"</p>}
          </div>

          {/* Actions */}
          <div className="grid content-start gap-1 p-4 pl-0">
            <button
              className="underline"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to delete this activity?'
                  )
                )
                  handleDeleteActivity(activity.id);
              }}
            >
              <TrashIcon className="w-6 h-6 transition text-slate-300 hover:brightness-90" />
            </button>

            <button className="underline" onClick={() => setFormShowing(true)}>
              <PencilSquareIcon className="w-6 h-6 transition text-slate-300 hover:brightness-90" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
