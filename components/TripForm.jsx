'use client';

import Link from 'next/link';
import Heading from './Heading';
import { countries } from '@/public/countries';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Form = ({ type }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [trip, setTrip] = useState({
    location: '',
    startDate: '',
    endDate: '',
    itinerary: [],
  });

  const createTrip = async (e) => {
    e.preventDefault();

    if (!trip.location) {
      alert('Please select a country from the list...');

      return;
    }

    if (trip.startDate > trip.endDate) {
      alert('Leaving date must be after arrival date...');

      return;
    }

    // Set 'loading' state so we can disable submit button once pressed
    setSubmitting(true);

    try {
      const response = await fetch('/api/trip/new', {
        method: 'POST',
        body: JSON.stringify({
          location: trip.location,
          userID: session?.user.id,
          startDate: trip.startDate,
          endDate: trip.endDate,
        }),
      });

      if (response.ok) {
        router.push('/trips');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="grid gap-8 p-4 bg-white rounded shadow-md">
      <Heading>{type} Trip</Heading>

      <form className="grid gap-8 whitespace-normal" onSubmit={createTrip}>
        {/* Location */}
        <div className="grid gap-4">
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

          <div className="flex items-center w-full gap-4">
            <hr className="flex-1" />

            <span>OR</span>

            <hr className="flex-1" />
          </div>

          <input className="input" type="text" />
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
              onChange={async (e) => {
                let newTrip = { ...trip, startDate: e.target.value };

                if (!trip.endDate) {
                  newTrip.endDate = e.target.value;
                }

                setTrip(newTrip);
              }}
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
        <div className="flex flex-wrap gap-2 justify-self-end">
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
