import Image from 'next/image';
import HeroImage from '@/public/images/hero-image.svg';
import PlaneImage from '@/public/images/plane.svg';
import TrailImage from '@/public/images/trail.svg';
import Link from 'next/link';
import Heading from '@/components/Heading';

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <div className="py-8">
        <div className="container grid items-center gap-8 md:grid-cols-2 md:max-w-screen-lg">
          <div className="grid gap-8">
            <h1 className="text-3xl font-bold lg:text-5xl">
              Your{' '}
              <span className="text-transparent gradient--green bg-clip-text">
                Ultimate
              </span>{' '}
              Travel Planning Companion!
            </h1>

            <Link
              href={'#'}
              className="button button--primary justify-self-start"
            >
              Get Started
            </Link>
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
