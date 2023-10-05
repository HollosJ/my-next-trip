'use client';

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
    <div className="inline-grid content-start no-scrollbar gap-4 p-4 text-left min-w-[320px] max-w-[320px] border-r last:border-r-0">
      {/* Formatted date */}
      <h3 className="text-lg font-bold">{formatDate(new Date(day.date))}</h3>

      {/* Activities */}
      {day.activities.length > 0 && (
        <div className="grid h-full gap-4">
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

      <div className="grid">
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
    </div>
  );
};

export default DateColumn;
