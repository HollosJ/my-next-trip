'use client';

import Heading from '@/components/Heading';
import Protected from '@/components/Protected';
import DateColumns from '@/components/DateColumns';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';
import Skeleton from '@/components/Skeleton';

const Trip = ({ params }) => {
  const { data: session } = useSession();
  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true);
  const [daysTill, setDaysTill] = useState(0);

  useEffect(() => {
    if (session?.user.id) fetchTrip();
  }, [session?.user.id]);

  const fetchTrip = async () => {
    const response = await fetch(
      `/api/users/${session?.user.id}/trips/${params.trip}`
    );
    const data = await response.json();

    setTrip(data);
    setLoading(false);

    const today = new Date();
    const tripDate = new Date(data.startDate);

    const difference =
      (tripDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    setDaysTill(Math.round(difference));
  };

  return (
    <>
      <div className="px-4 my-8">
        <Protected session={session}>
          {loading ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Skeleton className={'h-10 w-64'} />

              <Skeleton className={'h-10 w-48'} />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Heading>Your Trip To {trip.location}</Heading>

                {daysTill > 0 && (
                  <div className="flex items-center gap-2 p-2 text-white rounded bg-gradient-to-tr from-green-700 to-green-500">
                    <ClockIcon className="w-6 h-6" />

                    <p>Only {daysTill} days away!</p>
                  </div>
                )}
              </div>

              <DateColumns trip={trip} setTrip={setTrip} />
            </>
          )}
        </Protected>
      </div>
    </>
  );
};

export default Trip;
