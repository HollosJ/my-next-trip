import Heading from '@/components/Heading';
import Trips from '@/components/Trips';

export default function Home() {
  return (
    <section className="container my-8 md:max-w-screen-md">
      <Heading>Trips</Heading>

      <Trips />
    </section>
  );
}
