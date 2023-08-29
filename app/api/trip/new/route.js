import Trip from '@/models/trip';
import { connectToDB } from '@/utils/database';

export const POST = async (request) => {
  const { userID, location, startDate, endDate } = await request.json();

  try {
    await connectToDB();

    // Generate date between start and end of trip (inclusive)
    let currentDate = new Date(startDate);
    let lastDate = new Date(endDate);

    // Initialize dates array
    let dates = [];

    // Loop through every date between start and end, then generate a new object
    while (currentDate <= lastDate) {
      dates.push({ date: new Date(currentDate), activities: [] });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const newTrip = new Trip({
      user: userID,
      location,
      startDate,
      endDate,
      itinerary: dates,
    });

    await newTrip.save();

    return new Response(JSON.stringify(newTrip), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create trip', { status: 500 });
  }
};
