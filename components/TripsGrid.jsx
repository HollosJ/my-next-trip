'use client';

import React from 'react';
import Link from 'next/link';
import Heading from './Heading';

import { formatDate } from '@/utils/helpers';
import { FaceFrownIcon, PlusIcon } from '@heroicons/react/24/outline';

const TripsGrid = ({ trips, loading }) => {
  return (
    <div className="grid gap-8">
      <Heading>My Trips</Heading>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            <>
              <div className="h-16 skeleton"></div>
              <div className="h-16 skeleton"></div>
              <div className="h-16 skeleton"></div>
            </>
          ) : trips.length > 0 ? (
            trips.map((trip) => <Trip key={trip._id} trip={trip} />)
          ) : (
            <span className="flex items-center justify-center gap-2 sm:col-span-2 md:col-span-3">
              No Trips found <FaceFrownIcon className="w-6 h-6" />
            </span>
          )}
        </div>

        {!loading && (
          <Link className="flex items-center gap-2 button" href="/trips/new">
            New <PlusIcon width="20" height="20" />
          </Link>
        )}
      </div>
    </div>
  );
};

const Trip = ({ trip }) => {
  return (
    <Link
      className="p-4 break-all transition bg-white rounded shadow-md hover:opacity-75"
      href={`/trips/${trip._id}`}
    >
      <h3 className="text-lg font-bold">{trip.location}</h3>

      <span>{formatDate(trip.startDate)}</span>
    </Link>
  );
};

export default TripsGrid;
