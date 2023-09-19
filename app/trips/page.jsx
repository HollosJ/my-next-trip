'use client';

import TripsGrid from '@/components/TripsGrid';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const { data: session } = useSession({
    required: true,
  });

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/trips`);

      const data = await response.json();

      const dataSorted = data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.startDate) - new Date(b.startDate);
      });

      setTrips(dataSorted);
      setLoading(false);
    };

    if (session?.user.id) fetchTrips();
  }, [session]);

  return (
    <section className="container grid gap-8 my-8 md:max-w-screen-md">
      <TripsGrid trips={trips} loading={loading} />
    </section>
  );
};

export default Page;
