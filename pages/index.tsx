import Head from "next/head";
import Layout from "../components/Layout";
import LogoWithTypo from "../components/LogoWithTypo";
import SquareMenu from "../components/SquareMenu";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Al-Ihsan Apps</title>
      </Head>
      <div className="text-center mb-5">
        <LogoWithTypo/>
      </div>
      <div className="w-full grid grid-cols-2 grid-flow-row-dense md:grid-cols-3 gap-4">
        <div className=""><SquareMenu href="/al-quran" icon="/icon-quran.svg" label="Al-Qur'an"/></div>
        <div className="col-span-2"><SquareMenu href="/prayer-times" icon="/icon-salat-clock.svg" label="Waktu Salat"/></div>
        <div className=""><SquareMenu href="/islamic-calendar" icon="/icon-islamic-calendar.svg" label="Kalender Islam"/></div>
        <div className=""><SquareMenu icon="/icon-islamic-calendar.svg" label="Kumpulan Doa"/></div>
        <div className=""><SquareMenu icon="/icon-islamic-calendar.svg" label="Kalkulator Zakat"/></div>
      </div>
    </Layout>
  );
}
