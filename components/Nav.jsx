'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <nav className="py-2 bg-white">
      <div className="container flex items-center justify-between gap-4 md:max-w-screen-lg">
        {/* Logo */}
        <Link
          href={'/trips'}
          className="text-2xl font-bold md:text-3xl text-slate-900"
        >
          My
          <span className="text-transparent bg-gradient-to-tr from-green-700 to-green-500 bg-clip-text">
            Next
          </span>
          Trip
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden"
          onClick={() => {
            setMenuOpen((prev) => {
              return !prev;
            });
          }}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        {/* Desktop buttons */}
        <div className="hidden gap-2 md:flex">
          {session?.user ? (
            <div className="grid items-center gap-4 md:flex">
              <Link className="button button--primary" href={'/trips/new'}>
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
                    className="button button--primary"
                    type="button"
                    key={key}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  >
                    Sign in with Google
                  </button>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="bg-white md:hidden">
          <div className="container grid gap-4 p-4 md:max-w-screen-lg">
            {session?.user ? (
              <div className="grid items-center gap-2 md:flex">
                <Link className="button button--primary" href={'/trips/new'}>
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
                      className="button button--primary"
                      type="button"
                      key={key}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                    >
                      Sign in with Google
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
