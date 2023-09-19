'use client';

import Skeleton from './Skeleton';
import Heading from './Heading';
import DateColumns from './DateColumns';
import { ClockIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Trip = ({ trip, setTrip, loading, error, daysTill, deleteTrip }) => {
  return (
    <div className="">
      {error ? (
        <div className="grid gap-4 justify-items-start">
          <span className="font-bold text-red-500">
            {error}, this trip may have been deleted.
          </span>

          <Link className="button button--primary" href="/trips">
            My Trips
          </Link>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Dashboard header */}
          <div className="text-white bg-slate-300">
            <div className="container flex flex-wrap items-center justify-between gap-4 p-4">
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold md:text-4xl">
                Your Trip To{' '}
                {loading ? (
                  <div className="h-8 rounded w-36 bg-slate-200 animate-pulse"></div>
                ) : (
                  <span className="text-black">{trip.location}</span>
                )}
              </h1>

              <div className="flex flex-wrap gap-4">
                {daysTill > 0 && !loading && (
                  <div className="flex items-center gap-2 p-2 text-black bg-white rounded">
                    <ClockIcon className="w-6 h-6" />

                    <p>Only {daysTill} days away!</p>
                  </div>
                )}

                {!loading && (
                  <button
                    className="button button--danger"
                    onClick={deleteTrip}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Trip days */}
          <DateColumns trip={trip} setTrip={setTrip} />
        </div>
      )}
    </div>
  );
};

export default Trip;
