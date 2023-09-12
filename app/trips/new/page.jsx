"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import TripForm from "@/components/TripForm";

const NewTrip = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }

  const [submitting, setSubmitting] = useState(false);
  const [trip, setTrip] = useState({
    location: "",
    startDate: "",
    endDate: "",
    itinerary: [],
  });

  const createTrip = async (e) => {
    e.preventDefault();

    if (!trip.location) {
      alert("Please select a country from the list...");

      return;
    }

    if (trip.startDate > trip.endDate) {
      alert("Leaving date must be after arrival date...");

      return;
    }

    // Set 'loading' state so we can disable submit button once pressed
    setSubmitting(true);

    try {
      const response = await fetch("/api/trip/new", {
        method: "POST",
        body: JSON.stringify({
          location: trip.location,
          userID: session?.user.id,
          startDate: trip.startDate,
          endDate: trip.endDate,
        }),
      });

      if (response.ok) {
        router.push("/trips");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-8 md:max-w-screen-md">
      <TripForm
        type="Create"
        trip={trip}
        setTrip={setTrip}
        submitting={submitting}
        handleSubmit={createTrip}
      />
    </div>
  );
};

export default NewTrip;
