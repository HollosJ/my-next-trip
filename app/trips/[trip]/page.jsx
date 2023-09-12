"use client";

import Heading from "@/components/Heading";
import DateColumns from "@/components/DateColumns";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/solid";
import Skeleton from "@/components/Skeleton";

const Trip = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [trip, setTrip] = useState({});
  const [loading, setLoading] = useState(true);
  const [daysTill, setDaysTill] = useState(0);

  if (!session || !session?.user) {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    if (session?.user.id) fetchTrip();
  }, [session?.user.id]);

  const fetchTrip = async () => {
    const response = await fetch(
      `/api/users/${session?.user.id}/trips/${params.trip}`
    );
    const data = await response.json();

    setTrip(data);
    setLoading(false);

    const today = new Date();
    const tripDate = new Date(data.startDate);

    const difference =
      (tripDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    setDaysTill(Math.round(difference));
  };

  const deleteTrip = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/trips/${params.trip}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Send user back to their trips page
      router.push("/trips");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container px-4 my-8">
        {loading ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Skeleton className={"h-10 w-64"} />

            <Skeleton className={"h-10 w-48"} />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Heading>Your Trip To {trip.location}</Heading>

              <div className="flex gap-4">
                {daysTill > 0 && (
                  <div className="flex items-center gap-2 p-2 text-white rounded bg-gradient-to-tr from-green-700 to-green-500">
                    <ClockIcon className="w-6 h-6" />

                    <p>Only {daysTill} days away!</p>
                  </div>
                )}

                <button className="button button--danger" onClick={deleteTrip}>
                  Delete
                </button>
              </div>
            </div>

            <DateColumns trip={trip} setTrip={setTrip} />
          </>
        )}
      </div>
    </>
  );
};

export default Trip;
