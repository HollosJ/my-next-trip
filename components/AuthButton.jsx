'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AuthButton = ({ onClick }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {session?.user ? (
        <>
          <Link
            className="flex items-center gap-2 button button--primary"
            href={'/trips'}
            onClick={onClick ? onClick : null}
          >
            My Trips
          </Link>

          <button
            className="flex items-center gap-2 button"
            onClick={() => {
              signOut({ redirect: false });

              // If onclick function is passed, call it
              if (onClick) onClick();

              router.push('/');
            }}
          >
            Sign Out{' '}
            <Image
              className="rounded-full"
              src={session?.user.image}
              alt="User Thumbnail"
              width={16}
              height={16}
            />
          </button>
        </>
      ) : (
        <Link
          className="button button--primary"
          onClick={onClick ? onClick : null}
          href={'/api/auth/signin'}
        >
          Sign In
        </Link>
      )}
    </>
  );
};

export default AuthButton;
