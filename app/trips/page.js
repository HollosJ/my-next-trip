import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="my-8 container md:max-w-screen-md grid gap-4">
      <h1>My Trips</h1>

      <ul>
        <li>Trip 1</li>
        <li>Trip 2</li>
        <li>Trip 3</li>
      </ul>

      <Link className="px-4 py-2 rounded border-2" href={'/trips/new'}>
        Add New
      </Link>
    </div>
  );
};

export default page;
