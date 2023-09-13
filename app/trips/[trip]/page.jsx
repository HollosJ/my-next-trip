import Trip from '@/components/Trip';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const TripPage = async ({ params }) => {
  const session = await getServerSession();

  if (!session || !session?.user) {
    redirect('/api/auth/signin');
  }

  return <Trip params={params} />;
};

export default TripPage;
