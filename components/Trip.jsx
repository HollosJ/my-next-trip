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
        <div className="container grid max-w-sm gap-4 my-8 text-red-500 justify-items-center">
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
            My Trips
          </Link>
        </div>
      ) : (
        // grid md:content-stretch md:grid-flow-col-dense
        <div className="grid content-start grid-rows-[min-content,1fr] md:grid-rows-1 md:content-stretch md:grid-flow-col-dense">
          {/* Dashboard header */}
          <div className="grid content-start gap-4 p-4 text-white bg-slate-900 md:min-w-[16rem] md:max-w-sm">
            <h1 className="text-2xl font-bold md:text-4xl">
              Your Trip To{' '}
              {loading ? (
                <div className="h-8 rounded w-36 bg-slate-200 animate-pulse"></div>
              ) : (
                <span className="text-transparent break-words gradient--green bg-clip-text">
                  {trip.location}
                </span>
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
