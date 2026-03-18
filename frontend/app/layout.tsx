import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import {PhoneArrowDownLeftIcon} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: "Sze Chuan House",
  description: "Sze Chuan House's official website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-[100dvh] grid grid-rows-[auto_1fr_auto]`}
      >
      <section className={"max-w-372 w-full mx-auto px-10"}>
          <nav className={"flex justify-between items-center border-b-2 border-white"}>
              <Link href={"/"}>
                  <Image src={"/logo.png"} alt={"Logo of the restaurant"} width={200} height={200}/>
              </Link>
              <ul className={"flex gap-10 uppercase font-title"}>
                  <li><Link href="/menu" className={"btn py-2 text-white"}>Meny</Link></li>
                  <li><Link href="/contact" className={"btn py-2 text-white"}>Kontakt oss</Link></li>
                  <li><Link href="/booking" className={"py-3 px-5 text-white border-2 border-white rounded-3xl hover:bg-custom-eggwhite  hover:border-2 hover:border-custom-eggwhite hover:text-black transition-colors duration-300"}>Reserver bord</Link></li>
              </ul>
          </nav>
      </section>
          <div>
            {children}
          </div>
        <footer className={"flex justify-between px-30 py-6 bg-custom-red text-white"}>
            <div>
                <h3 className={"text-2xl mb-3"}>Opening hours</h3>
                <p>Open Tuesday to Sunday 1:30 - 9:30 pm</p>
            </div>
            <div>
                <h3 className={"text-2xl mb-3"}>Address</h3>
                <address className={"not-italic"}>
                    <a href={"https://maps.app.goo.gl/RTmRGc1UnXhyFcev5"} className={"underline"}>Nedre Korskirkeallmenningen 9</a>
                    <p>5017 Bergen</p>
                    <p>Norway</p>
                </address>
            </div>
            <div>
                <h3 className={"text-2xl mb-3"}>Contact</h3>
                <address className={"not-italic"}>
                    {/*<a href={}></a> placeholder for email*/}
                    <a href={"tel:+47-553-136-90"} className={"flex gap-2 underline"}>
                        <PhoneArrowDownLeftIcon className={"h-[18px] w-[18px]"}/>
                        <p>55313690</p>
                    </a>
                    <a href={"https://www.facebook.com/szechuanhousebergen/"} className={"underline"}>Facebook</a>
                </address>
            </div>
        </footer>
      </body>
    </html>
  );
}
