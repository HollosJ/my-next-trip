import Trip from '@/models/trip';
import { connectToDB } from '@/utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const trips = await Trip.find({
      user: params.userID,
    }).populate('user');

    return new Response(JSON.stringify(trips), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch trips', { status: 500 });
  }
};
