import Image from 'next/image';
import HeroImage from '@/public/images/hero-image.svg';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) redirect('/trips');

  return (
    <>
      {/* Hero section */}
      <div className="py-8">
        <div className="container grid items-center gap-8 md:grid-cols-2 md:max-w-screen-lg">
          <div className="grid gap-8 justify-items-start">
            <h1 className="text-3xl font-bold lg:text-5xl">
              Your{' '}
              <span className="text-transparent gradient--green bg-clip-text">
                Ultimate
              </span>{' '}
              Travel Planning Companion!
            </h1>

            {!session?.user && (
              <Link className="button button--primary" href="/api/auth/signin">
                Get Started
              </Link>
            )}
          </div>

          <Image
            src={HeroImage}
            width={640}
            height={424}
            alt="Map with travel related items atop"
          />
        </div>
      </div>
    </>
  );
}
