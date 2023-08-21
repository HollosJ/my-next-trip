"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <nav className="py-2 bg-gradient-to-b from-white to-transparent">
      <div className="container flex items-center justify-between gap-4 md:max-w-screen-lg">
        {/* Logo */}
        <Link
          href={"/"}
          className="text-2xl font-bold md:text-3xl text-slate-900"
        >
          My
          <span className="text-transparent bg-gradient-to-tr from-green-700 to-green-500 bg-clip-text">
            Next
          </span>
          Trip
        </Link>

        {/* Login */}
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link className="button button__primary" href={"/trips/new"}>
              Add New Trip
            </Link>

            <button
              className="flex items-center gap-2 button"
              onClick={signOut}
            >
              Sign Out
              <Image
                className="object-cover rounded-full aspect-square"
                src={session?.user.image}
                width={16}
                height={16}
                alt="Profile image"
              />
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, key) => (
                <button
                  className="px-4 py-2 border-2 rounded"
                  type="button"
                  key={key}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
