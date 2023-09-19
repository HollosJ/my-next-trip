'use client';

import Trip from '@/components/Trip';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
  });

  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true);
  const [daysTill, setDaysTill] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user.id) fetchTrip();
  }, [session?.user.id]);

  const fetchTrip = async () => {
    const response = await fetch(
      `/api/users/${session?.user.id}/trips/${params.trip}`
    );

    if (!response.ok) {
      setError(response.statusText);
      return;
    }

    const data = await response.json();

    setTrip(data);
    setLoading(false);

    const today = new Date();
    const tripDate = new Date(data.startDate);

    const difference =
      (tripDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    setDaysTill(Math.round(difference));
  };

  const deleteTrip = async () => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;

    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/trips/${params.trip}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Send user back to their trips page
      router.push('/trips');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Trip
      trip={trip}
      setTrip={setTrip}
      deleteTrip={deleteTrip}
      daysTill={daysTill}
      loading={loading}
      error={error}
    />
  );
};

export default Page;
