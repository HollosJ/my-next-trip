import Nav from "@/components/Nav";
import SessionProvider from "@/components/Provider";
import { getServerSession } from "next-auth";
import "@/styles/main.css";

import { Bricolage_Grotesque } from "next/font/google";

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "My Next Trip",
  description: "Trip Planning Web Application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${bricolage_grotesque.className} bg-slate-50 bg-no-repeat min-h-screen overflow-x-hidden`}
      >
        <SessionProvider session={session}>
          <Nav />

          <main className="my-8">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
