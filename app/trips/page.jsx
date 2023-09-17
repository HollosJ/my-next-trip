import TripsGrid from '@/components/TripsGrid';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Trips = async () => {
  const session = await getServerSession();

  if (!session || !session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <section className="container grid gap-8 my-8 md:max-w-screen-md">
      <TripsGrid />
    </section>
  );
};

export default Trips;
