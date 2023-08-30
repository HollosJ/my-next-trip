import Trip from '@/models/trip';
import { connectToDB } from '@/utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const trip = await Trip.findOne({
      user: params.userID,
      _id: params.tripID,
    });

    return new Response(JSON.stringify(trip), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch trip', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { itinerary } = await request.json();

  try {
    await connectToDB();

    const existingTrip = await Trip.findOne({
      user: params.userID,
      _id: params.tripID,
    });

    if (!existingTrip) {
      return new Response('Trip not found', { status: 404 });
    }

    existingTrip.itinerary = itinerary;

    await existingTrip.save();

    return new Response(JSON.stringify(existingTrip), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to update trip' + error.message, {
      status: 500,
    });
  }
};

// delete
