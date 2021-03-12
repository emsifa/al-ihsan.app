import Head from "../components/Head";
import Layout from "../components/Layout";
import LogoAlIhsan from "../components/LogoAlIhsan";
import SquareMenu from "../components/SquareMenu";

export default function Home() {
  return (
    <Layout>
      <Head/>
      <div className="mb-5 flex flex-wrap justify-center content-center">
        <div className="w-full sm:w-auto flex justify-center">
          <LogoAlIhsan size={64}/>
        </div>
        <div className="w-full sm:w-auto px-3 select-none text-center">
          <h1 className="font-bold text-3xl text-primary">Al-Ihsan Apps</h1>
          <p className="text-sm font-semibold text-oxford-blue">Kumpulan aplikasi dan informasi islami.</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 grid-flow-row-dense md:grid-cols-3 gap-4">
        <div className=""><SquareMenu href="/al-quran" icon="/icon-quran.svg" label="Al-Qur'an"/></div>
        <div className="col-span-2"><SquareMenu href="/prayer-times" icon="/icon-salat-clock.svg" label="Waktu Salat"/></div>
        <div className=""><SquareMenu href="/islamic-calendar" icon="/icon-islamic-calendar.svg" label="Kalender Islam"/></div>
        <div className=""><SquareMenu href="/duas" icon="/icon-pray.svg" label="Kumpulan Doa"/></div>
        <div className=""><SquareMenu href="/zakat-calculator" icon="/icon-calculator-zakat.svg" label="Kalkulator Zakat"/></div>
      </div>
    </Layout>
  );
}
