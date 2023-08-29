'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
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
