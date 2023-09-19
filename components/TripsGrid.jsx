'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Heading from './Heading';

import { formatDate } from '@/utils/helpers';

const TripsGrid = ({ trips, loading }) => {
  return (
    <div className="grid gap-8">
      <Heading>My Trips</Heading>

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
      </div>

      {!loading && (
        <Link className="button button--primary" href={'/trips/new'}>
          Add New
        </Link>
      )}
    </div>
  );
};

export default TripsGrid;
