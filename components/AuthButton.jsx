'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      {session?.user ? (
        <button
          className="flex items-center gap-2 button"
          onClick={() => {
            signOut({ redirect: false });

            router.push('/');
          }}
        >
          Sign Out{' '}
          <Image
            className="rounded-full"
            src={session?.user.image}
            alt="User Thumbnail"
            width={30}
            height={30}
          />
        </button>
      ) : (
        <Link className="button button--primary" href={'/api/auth/signin'}>
          Sign In
        </Link>
      )}
    </>
  );
};

export default AuthButton;
