import Nav from '@/components/Nav';
import SessionProvider from '@/components/Provider';
import '@/styles/main.css';

import { Bricolage_Grotesque } from 'next/font/google';
import { Toaster } from 'sonner';

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next Trip',
  description: 'Trip Planning Web Application',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${bricolage_grotesque.className} bg-slate-50 bg-no-repeat overflow-x-hidden`}
      >
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <SessionProvider>
            <Toaster visibleToasts={1} position="bottom-center" />

            <Nav />

            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
