'use client';

import DateColumns from './DateColumns';
import { ClockIcon } from '@heroicons/react/24/solid';
import ErrorImage from '@/public/images/error-image.svg';
import Link from 'next/link';
import Image from 'next/image';
import Heading from './Heading';

const Trip = ({ trip, setTrip, loading, error, daysTill, deleteTrip }) => {
  return (
    <div className="grid flex-auto h-full">
      {error ? (
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
            Go back to My Trips
          </Link>
        </div>
      ) : (
        <div className="grid content-start grid-rows-[min-content,1fr] md:grid-rows-1 md:content-stretch md:grid-cols-[min-content,1fr]">
          {/* Dashboard header */}
          <div className="grid content-start gap-4 p-4 text-white bg-slate-950 md:w-64">
            {/* Title */}
            <div className="overflow-hidden">
              <span>Your trip to</span>

              <h1>
                {loading ? (
                  <div className="h-8 rounded w-36 bg-slate-200 animate-pulse"></div>
                ) : (
                  <span
                    className={`text-transparent break-words gradient--green font-bold bg-clip-text ${
                      trip.location.length <= 10 ? 'text-4xl' : 'text-xl'
                    }`}
                  >
                    {trip.location}
                  </span>
                )}
              </h1>
            </div>

            <div className="flex flex-wrap gap-4">
              {daysTill > 0 && !loading && (
                <div className="flex items-center gap-2 p-2 text-black bg-white rounded">
                  <ClockIcon className="w-6 h-6" />

                  <p>Only {daysTill} days away!</p>
                </div>
              )}

              {!loading && (
                <button className="button button--danger" onClick={deleteTrip}>
                  Delete
                </button>
              )}
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
