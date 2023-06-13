import "./globals.scss";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Events",
  description: "A simple event browser",
};

function Header() {
  return (
    <header
      className={
        "flex items-baseline justify-between w-full h-20 bg-gray-800 dark:bg-gray-950 py-4 px-[15%]"
      }
    >
      <div
        id="logo"
        className={
          "flex items-center justify-center h-full text-cyan-300 font-serif text-xl md:text-4xl"
        }
      >
        <Link href={"/"}>NextEvents</Link>
      </div>
      <nav>
        <ul className={"text-cyan-500 text-lg md:text-2xl"}>
          <li>
            <Link href={"/events"}>Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`h-screen bg-gray-800 dark:bg-gray-950 ${inter.className}`}
      >
        <Header />
        <div className={'bg-[#E4F2F1] dark:bg-gray-800 block h-[2.18rem]'}/>
        <main className={`bg-[#E4F2F1] dark:bg-gray-800 h-auto min-h-[90.3vh] pb-8`}>{children}</main>
      </body>
    </html>
  );
}
