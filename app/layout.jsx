import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/main.css';

import { Bricolage_Grotesque } from 'next/font/google';

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next Trip',
  description: 'Trip Planning Web Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${bricolage_grotesque.className} bg-slate-50 bg-no-repeat min-h-screen`}
      >
        <Provider>
          <Nav />

          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
