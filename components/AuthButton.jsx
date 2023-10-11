'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AuthButton = ({ onClick }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      {status === 'authenticated' && (
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
              toast.success('Signed out successfully! 👋');

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
      )}

      {status === 'unauthenticated' && (
        <Link
          className="button button--primary"
          onClick={onClick ? onClick : null}
          href={'/api/auth/signin?=callbackUrl=/trips'}
        >
          Sign In
        </Link>
      )}

      {status === 'loading' && <p>Loading...</p>}
    </>
  );
};

export default AuthButton;
