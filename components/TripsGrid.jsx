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

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/trips`);
      const data = await response.json();

      setTrips(data);
      setLoading(false);
    };

    if (session?.user.id) fetchTrips();
  }, [session?.user.id]);
  return (
    <div className="grid gap-8">
      <Heading>My Trips</Heading>

      <Protected session={session}>
        <div className="grid gap-4">
          {loading ? (
            'Loading your trips...'
          ) : trips.length ? (
            <div className="grid gap-4">
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
            </div>
          ) : (
            <span>You have no trips yet!</span>
          )}

          <Link className="button button--primary" href={'/trips/new'}>
            Add New
          </Link>
        </div>
      </Protected>
    </div>
  );
};

export default TripsGrid;
