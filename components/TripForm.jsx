import Link from 'next/link';
import Heading from './Heading';
import { countries } from '@/public/countries';

const Form = ({ type, trip, setTrip, submitting, handleSubmit }) => {
  return (
    <section className="grid gap-8 p-8 bg-white rounded shadow-md">
      <Heading>{type} Trip</Heading>

      <form className="grid gap-8 whitespace-normal" onSubmit={handleSubmit}>
        {/* Location */}
        <div className="grid">
          <label htmlFor="location">Where are you going?</label>

          <select
            className="input"
            name="location"
            id="location"
            value={trip.location}
            onChange={(e) =>
              setTrip({
                ...trip,
                location: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Please select...
            </option>

            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 md:gap-4 md:grid-cols-2">
          {/* Start Date */}
          <div className="grid">
            <label htmlFor="start_date">Arrival date</label>

            <input
              className="input"
              type="date"
              id="start_date"
              value={trip.startDate}
              required
              onChange={(e) =>
                setTrip({
                  ...trip,
                  startDate: e.target.value,
                })
              }
            />
          </div>

          {/* End Date */}
          <div className="grid">
            <label htmlFor="end_date">Leaving date</label>

            <input
              className="input"
              type="date"
              id="end_date"
              value={trip.endDate}
              required
              onChange={(e) =>
                setTrip({
                  ...trip,
                  endDate: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="grid gap-2 justify-self-end sm:grid-cols-2">
          <Link className="button" href="/">
            Cancel
          </Link>

          <button className="button button--primary" disabled={submitting}>
            {submitting ? 'Submitting...' : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
