'use client';

import { useSession } from 'next-auth/react';
import Activity from './Activity';
import ActivityForm from './ActivityForm';
import { formatDate } from '@/utils/helpers';
import { useState } from 'react';

const DateColumn = ({
  day,
  handleAddActivity,
  handleEditActivity,
  handleDeleteActivity,
}) => {
  const [formShowing, setFormShowing] = useState(false);

  return (
    <div className="inline-grid content-start overflow-y-auto no-scrollbar gap-4 text-left rounded min-w-[300px] max-w-[300px]">
      {/* Formatted date */}
      <h3 className="text-lg font-bold">{formatDate(new Date(day.date))}</h3>

      {/* Activities */}
      {day.activities.length > 0 && (
        <div className="grid gap-4">
          {day.activities.map((activity, key) => (
            <Activity
              key={key}
              day={day}
              activity={activity}
              handleDeleteActivity={handleDeleteActivity}
              onSave={handleEditActivity}
            />
          ))}
        </div>
      )}

      {formShowing ? (
        <ActivityForm
          onSave={handleAddActivity}
          day={day}
          setFormShowing={setFormShowing}
        />
      ) : (
        <button className="button" onClick={() => setFormShowing(true)}>
          Add New
        </button>
      )}
    </div>
  );
};

export default DateColumn;
