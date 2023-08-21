"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Heading from "@/components/Heading";
import { useSession } from "next-auth/react";

const Trips = () => {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/trips`);
      const data = await response.json();

      setTrips(data);
      setLoading(false);
    };

    if (session?.user.id) fetchTrips();
  }, [session?.user.id]);

  return (
    <section className="container grid gap-8 my-8 md:max-w-screen-md">
      <Heading>My Trips</Heading>

      {loading ? (
        <span>Loading...</span>
      ) : trips.length ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {trips.map((trip) => (
            <button className="p-4 bg-white rounded shadow-md" key={trip._id}>
              {trip.location}
            </button>
          ))}
        </div>
      ) : (
        <span>No trips yet</span>
      )}

      <Link className="button button__primary" href={"/trips/new"}>
        Add New
      </Link>
    </section>
  );
};

export default Trips;
