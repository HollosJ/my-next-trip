import TripForm from '@/components/TripForm';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const NewTrip = async () => {
  const session = await getServerSession();

  if (!session || !session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container my-8 md:max-w-screen-md">
      <TripForm />
    </div>
  );
};

export default NewTrip;
