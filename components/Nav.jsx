'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import AuthButton from './AuthButton';
import Link from 'next/link';

const Nav = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative">
      {/* Nav menu */}
      <div className="relative z-20 bg-white shadow">
        <div className="container flex items-center justify-between py-2">
          {/* Logo */}
          <Link
            className="text-xl font-bold md:text-3xl whitespace-nowrap"
            href="/"
          >
            My{' '}
            <span className="text-transparent bg-clip-text gradient--green">
              Next
            </span>{' '}
            Trip
          </Link>

          {/* Nav toggle */}
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      <div
        className={`absolute transition-all z-10 grid gap-4 p-4 bg-white w-full duration-300 content-start max-h-screen sm:max-w-xs top-full ${
          menuOpen ? 'right-0' : '-right-full'
        }`}
      >
        {session?.user && (
          <>
            <Link
              className="button"
              href={'/trips'}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              My Trips
            </Link>
          </>
        )}

        <AuthButton />
      </div>
    </nav>
  );
};

export default Nav;
