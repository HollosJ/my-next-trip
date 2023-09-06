'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Protected from './Protected';
import Link from 'next/link';
import Heading from './Heading';

import { formatDate } from '@/utils/helpers';

const TripsGrid = () => {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (session?.user.id) fetchTrips();
  }, [session?.user.id]);

  const fetchTrips = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/trips`);

    if (!response.ok) setError(true);
    else setError(false);

    const data = await response.json();

    const dataSorted = data.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.startDate) - new Date(b.startDate);
    });

    setTrips(dataSorted);
    setLoading(false);
  };

  return (
    <Protected session={session}>
      <div className="grid gap-8">
        <Heading>My Trips</Heading>

        <div className="grid gap-4">
          {loading ? (
            'Loading your trips...'
          ) : trips.length ? (
            <div className="grid gap-4">
              {error ? (
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-red-700">
                    Error getting your trips from the database
                  </p>

                  <button
                    className="underline button button--primary"
                    onClick={fetchTrips}
                  >
                    Retry?
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {trips.map((trip) => (
                    <Link
                      className="p-4 transition bg-white rounded shadow-md hover:opacity-75"
                      key={trip._id}
                      href={`/trips/${trip._id}`}
                    >
                      <h3 className="font-bold">{trip.location}</h3>

                      <span>{formatDate(trip.startDate)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span>You have no trips yet!</span>
          )}
        </div>

        {!loading && (
          <Link className="button button--primary" href={'/trips/new'}>
            Add New
          </Link>
        )}
      </div>
    </Protected>
  );
};

export default TripsGrid;
