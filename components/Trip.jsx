'use client';

import Skeleton from './Skeleton';
import Heading from './Heading';
import DateColumns from './DateColumns';
import { ClockIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const Trip = ({ trip, setTrip, loading, error, daysTill, deleteTrip }) => {
  return (
    <div className="container px-4 my-8">
      {error ? (
        <div className="grid gap-4 justify-items-start">
          <span className="font-bold text-red-500">
            {error}, this trip may have been deleted.
          </span>

          <Link className="button button--primary" href="/trips">
            My Trips
          </Link>
        </div>
      ) : loading ? (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Skeleton className={'h-10 w-64'} />

          <Skeleton className={'h-10 w-48'} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Heading>Your Trip To {trip.location}</Heading>

            <div className="flex gap-4">
              {daysTill > 0 && (
                <div className="flex items-center gap-2 p-2 text-white rounded bg-gradient-to-tr from-green-700 to-green-500">
                  <ClockIcon className="w-6 h-6" />

                  <p>Only {daysTill} days away!</p>
                </div>
              )}

              <button className="button button--danger" onClick={deleteTrip}>
                Delete
              </button>
            </div>
          </div>

          <DateColumns trip={trip} setTrip={setTrip} />
        </>
      )}
    </div>
  );
};

export default Trip;
