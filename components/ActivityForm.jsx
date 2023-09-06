import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const ActivityForm = ({ activity, onSave, setFormShowing }) => {
  const fieldIDs = {
    title: uuid(),
    location: uuid(),
    notes: uuid(),
  };

  const [editedActivity, setEditedActivity] = useState(
    activity || {
      title: '',
      location: '',
      notes: '',
    }
  );

  const handleInputChange = (event) => {
    const { datafieldtitle, value } = event.target;

    setEditedActivity((prevActivity) => ({
      ...prevActivity,
      [datafieldtitle]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedActivity);

    if (!activity) {
      setEditedActivity({
        title: '',
        location: '',
        notes: '',
      });
    } else {
      setFormShowing(false);
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSave}>
      {/* Title (required) */}
      <div className="grid">
        <label htmlFor={fieldIDs.title}>What?</label>
        <input
          className="input"
          type="text"
          id={fieldIDs.title}
          value={editedActivity.title}
          onChange={handleInputChange}
          datafieldtitle="title"
          required
        />
      </div>

      {/* Location (optional) */}
      <div className="grid">
        <label htmlFor={fieldIDs.location}>Where?</label>
        <input
          className="input"
          type="text"
          id={fieldIDs.location}
          value={editedActivity.location}
          onChange={handleInputChange}
          datafieldtitle="location"
        />
      </div>

      {/* Notes (optional) */}
      <div className="grid">
        <label htmlFor={fieldIDs.notes}>Relevant Notes</label>
        <textarea
          className="input"
          id={fieldIDs.notes}
          value={editedActivity.notes}
          onChange={handleInputChange}
          datafieldtitle="notes "
        />
      </div>

      <div className="flex gap-2 justify-self-end">
        {activity && (
          <button className="button" onClick={() => setFormShowing(false)}>
            Cancel
          </button>
        )}

        <button className="button button--primary">
          {activity ? 'Save Changes' : 'Add Activity'}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
