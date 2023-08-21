import Trip from "@/models/trip";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { userID, location, startDate, endDate } = await req.json();

  try {
    await connectToDB();

    const newTrip = new Trip({
      user: userID,
      location,
      startDate,
      endDate,
    });

    await newTrip.save();

    return new Response(JSON.stringify(newTrip), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create trip", { status: 500 });
  }
};
