import Trip from '@/models/trip';
import { connectToDB } from '@/utils/database';

// Fetch a trip
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

// Update a trip
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

// Delete a trip
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Trip.findOneAndDelete({
      _id: params.tripID,
    });

    return new Response('Successfully deleted trip', { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete trip', { status: 500 });
  }
};
