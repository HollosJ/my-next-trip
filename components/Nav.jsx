'use client';

import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import AuthButton from './AuthButton';
import Link from 'next/link';

const Nav = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  function openMenu() {
    setMenuOpen(true);
    document.body.style.overflowY = 'hidden';
  }

  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflowY = 'auto';
  }

  return (
    <nav className="relative z-50 bg-white shadow">
      <div className="container flex items-center justify-between py-2">
        {/* Logo */}
        <Link
          className="text-xl font-bold md:text-3xl whitespace-nowrap"
          href={session?.user?.id ? '/trips' : '/'}
        >
          My{' '}
          <span className="text-transparent bg-clip-text gradient--green">
            Next
          </span>{' '}
          Trip
        </Link>

        {/* Nav toggle */}
        <button onClick={openMenu}>
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Menu */}
      <div className="fixed top-0 right-0 w-screen h-screen contents">
        {/* Backdrop */}
        <button
          className={`absolute left-0 w-screen h-screen top-0 transition ${
            menuOpen
              ? 'bg-slate-300/25 backdrop-blur-[2px]'
              : 'pointer-events-none'
          }`}
          onClick={closeMenu}
        ></button>

        <aside
          className={`h-screen max-w-xs w-full content-start items-start absolute top-0 grid overflow-y-auto gap-4 transition-all bg-white p-4 ${
            menuOpen ? 'right-0' : '-right-full'
          }`}
        >
          <button
            className="cursor-pointer justify-self-end"
            onClick={closeMenu}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="grid items-start gap-2">
            {session?.user && (
              <Link className="button" href={'/trips'} onClick={closeMenu}>
                My Trips
              </Link>
            )}

            <AuthButton />
          </div>
        </aside>
      </div>
    </nav>
  );
};

export default Nav;
