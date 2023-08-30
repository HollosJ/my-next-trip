import { useState } from 'react';

const ActivityForm = ({ activity, onSave, setFormShowing }) => {
  const [editedActivity, setEditedActivity] = useState(
    activity || {
      title: '',
      location: '',
      notes: '',
    }
  );

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setEditedActivity((prevActivity) => ({
      ...prevActivity,
      [id]: value,
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
        <label htmlFor="title">What?</label>
        <input
          className="input"
          type="text"
          id="title"
          value={editedActivity.title}
          onChange={handleInputChange}
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
          value={editedActivity.location}
          onChange={handleInputChange}
        />
      </div>

      {/* Notes (optional) */}
      <div className="grid">
        <label htmlFor="notes">Relevant Notes</label>
        <textarea
          className="input"
          id="notes"
          value={editedActivity.notes}
          onChange={handleInputChange}
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
