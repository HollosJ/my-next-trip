import { useState } from 'react';
import ActivityForm from './ActivityForm';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';

const Activity = ({ activity, day, onSave, handleDeleteActivity }) => {
  const [formShowing, setFormShowing] = useState(false);

  const handleSave = (day, editedActivity) => {
    onSave(day, editedActivity);
  };

  return (
    <div className="text-black rounded">
      {/* Show activity details */}
      <div className="whitespace-normal bg-white rounded shadow-md">
        {formShowing ? (
          <div className="grid p-2">
            <ActivityForm
              activity={activity}
              day={day}
              onSave={handleSave}
              setFormShowing={setFormShowing}
            />
          </div>
        ) : (
          <div className="relative flex items-start">
            {/* Activity content */}
            <div className="grid flex-1 p-2">
              <h3 className="text-lg font-bold">{activity.title}</h3>

              {activity.location && <span>{activity.location}</span>}

              {activity.time && <span>{activity.time}</span>}

              {activity.notes && (
                <p className="break-all opacity-75">"{activity.notes}"</p>
              )}
            </div>

            {/* Actions */}
            <div className="grid content-start gap-1 p-4 pl-0">
              <button
                className="underline"
                onClick={() =>
                  toast.error(
                    'Are you sure you want to delete this activity?',
                    {
                      action: {
                        label: 'Delete',
                        onClick: () => handleDeleteActivity(day, activity),
                      },
                    }
                  )
                }
              >
                <TrashIcon className="w-6 h-6 transition text-slate-300 hover:brightness-90" />
              </button>

              <button
                className="underline"
                onClick={() => setFormShowing(true)}
              >
                <PencilSquareIcon className="w-6 h-6 transition text-slate-300 hover:brightness-90" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
