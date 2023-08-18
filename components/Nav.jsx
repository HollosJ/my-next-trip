'use client';

import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const userLoggedIn = true;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="py-8 bg-gradient-to-b from-white to-transparent">
      <div className="container flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={'/'}
          className="text-2xl font-bold md:text-4xl text-slate-900"
        >
          My
          <span className="text-transparent bg-gradient-to-tr from-green-700 to-green-500 bg-clip-text">
            Next
          </span>
          Trip
        </Link>

        {/* Login */}
        {userLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              className="px-4 py-2 text-white bg-black rounded"
              href={'/trips/new'}
            >
              Add New Trip
            </Link>

            <button className="px-4 py-2 border-2 rounded" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  className="px-4 py-2 border-2 rounded"
                  type="button"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
