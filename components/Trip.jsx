'use client';

import DateColumns from './DateColumns';
import { ArrowUturnLeftIcon, ClockIcon } from '@heroicons/react/24/solid';
import ErrorImage from '@/public/images/error-image.svg';
import Link from 'next/link';
import Image from 'next/image';
import Heading from './Heading';
import { toast } from 'sonner';

const Trip = ({ trip, setTrip, loading, error, daysTill, deleteTrip }) => {
  return (
    <div className="grid flex-auto h-full">
      {error ? (
        <Error error={error} />
      ) : (
        <div className="grid content-start grid-rows-[min-content,1fr] md:grid-rows-1 md:content-stretch md:grid-cols-[min-content,1fr]">
          {/* Dashboard header */}
          <div className="grid content-between gap-4 p-4 text-white bg-slate-950 md:w-64">
            {/* Top */}
            <div className="grid gap-4">
              {/* Back button */}
              <Link
                className="flex gap-2 underline transition hover:opacity-75"
                href="/trips"
              >
                <ArrowUturnLeftIcon className="w-6 h-6" />

                <span>Trips</span>
              </Link>

              {/* Title */}
              <div className="grid gap-2 overflow-hidden">
                <span>Your trip to</span>

                <h1>
                  {loading ? (
                    <div className="h-8 rounded w-36 bg-slate-200 animate-pulse"></div>
                  ) : (
                    <span
                      className={`text-transparent text-2xl break-all gradient--green font-bold bg-clip-text`}
                    >
                      {trip.location}
                    </span>
                  )}
                </h1>
              </div>

              {/* Days till */}
              {daysTill > 0 && !loading && (
                <div className="flex items-center gap-2 p-2 rounded justify-self-start md:justify-self-stretch gradient--green">
                  <ClockIcon className="w-6 h-6" /> Only {daysTill} days away!
                </div>
              )}
            </div>

            {/* Bottom */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Delete button */}
              <button
                className="text-red-500 underline"
                onClick={() =>
                  toast('Are you sure you want to delete this trip?', {
                    action: {
                      label: 'Delete',
                      onClick: () => deleteTrip(trip.id),
                    },
                  })
                }
              >
                Delete trip
              </button>
            </div>
          </div>

          {/* Trip days */}
          <DateColumns trip={trip} setTrip={setTrip} />
        </div>
      )}
    </div>
  );
};

const Error = ({ error }) => {
  return (
    <div className="container grid content-start max-w-sm gap-4 my-8 text-red-500 justify-items-center">
      <Image
        src={ErrorImage}
        alt="Error image"
        width={1120}
        height={700}
        priority
      />

      <Heading>Oops!</Heading>

      <span>{error}</span>

      <Link className="button button--primary" href="/trips">
        Go back to Trips
      </Link>
    </div>
  );
};

export default Trip;
