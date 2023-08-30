'use client';

import Heading from '@/components/Heading';
import Protected from '@/components/Protected';
import PointsOfInterestGrid from '@/components/PointsOfInterestGrid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Trip = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true);
  const [daysTill, setDaysTill] = useState(0);

  useEffect(() => {
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

    if (session?.user.id) fetchTrip();
  }, [session?.user.id]);

  const updateTrip = async (newTrip) => {
    // Update state
    setTrip(newTrip);

    // Update database with PATCH request
    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/trips/${params.trip}`,
        { method: 'PATCH', body: JSON.stringify(trip) }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Updated trip:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container my-8 md:max-w-screen-md">
        <Protected session={session}>
          {loading ? (
            <div className="w-full h-10 rounded md:w-64 bg-slate-400 animate-pulse"></div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Heading>Your Trip To {trip.location}</Heading>

              {daysTill > 0 && (
                <div className="flex items-center gap-2 p-2 text-white rounded bg-gradient-to-tr from-green-700 to-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <p>Only {daysTill} days away!</p>
                </div>
              )}
            </div>
          )}

          {trip ? (
            <PointsOfInterestGrid trip={trip} updateTrip={updateTrip} />
          ) : (
            'Loading'
          )}
        </Protected>
      </div>
    </>
  );
};

export default Trip;
