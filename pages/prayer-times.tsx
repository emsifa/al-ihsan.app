import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faInfoCircle,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, addDays } from "date-fns";
import id from "date-fns/locale/id";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Clock from "../components/Clock";
import ExternalLink from "../components/ExternalLink";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import Modal from "../components/Modal";
import NavbarTitle from "../components/NavbarTitle";
import Select from "../components/Select";
import { getPrayTimes } from "../helpers/pray-time";
import { getRegions } from "../services/prayer-times";
import { PrayTimeRegion, PrayTimes } from "../types";

interface PrayTimesPageProps {
  regions: PrayTimeRegion[];
}

const PrayTimesPage: NextPage<PrayTimesPageProps> = ({ regions }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [prayTimes, setPrayTimes] = useState<PrayTimes | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedRegion && regions) {
      setSelectedRegion(regions[0].id);
    }
  }, [regions, selectedRegion]);

  useEffect(() => {
    const region = (regions || []).find((r) => r.id === selectedRegion);
    setPrayTimes(region ? getPrayTimes(region.lat, region.lng, date) : null);
  }, [date, selectedRegion, regions]);

  return (
    <LayoutWithNavbar
      navbarTitle={
        <NavbarTitle title="Waktu Salat" icon="/icon-salat-clock.svg" />
      }
      leftButton={
        <Link href="/">
          <span>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" />
          </span>
        </Link>
      }
      rightButton={
        <span onClick={() => setShowInfo(!showInfo)}>
          <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" />
        </span>
      }
    >
      <Head>
        <title>Al-Ihsan Apps &mdash; Waktu Salat</title>
      </Head>

      <ModalInfo shown={showInfo} onClose={() => setShowInfo(false)} />

      <div className="mb-5 w-full mt-3">
        <Select
          leftIcon={
            <FontAwesomeIcon
              className={selectedRegion ? "text-primary" : "text-gray-300"}
              icon={faMapMarkerAlt}
            />
          }
          rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
          onChange={(e) =>
            setSelectedRegion((e.target as HTMLSelectElement).value)
          }
        >
          {(regions || []).map((region) => (
            <option value={region.id}>{region.name}</option>
          ))}
        </Select>

        <div className="mt-3">
          <DateNavigator
            date={date}
            onClickPrev={() => setDate(addDays(date, -1))}
            onClickNext={() => setDate(addDays(date, 1))}
          />
        </div>

        {prayTimes && (
          <div className="rounded bg-white mt-3 select-none overflow-hidden">
            <PrayTime label="Subuh" time={`${prayTimes.fajr}`} />
            <PrayTime label="Zuhur" time={`${prayTimes.dhuhr}`} />
            <PrayTime label="Ashar" time={`${prayTimes.asr}`} />
            <PrayTime label="Maghrib" time={`${prayTimes.maghrib}`} />
            <PrayTime label="Isya" time={`${prayTimes.isha}`} />
          </div>
        )}
      </div>
    </LayoutWithNavbar>
  );
};

export default PrayTimesPage;

const DateNavigator: FC<{
  date: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}> = ({ date, onClickPrev, onClickNext }) => (
  <div className="flex rounded overflow-hidden select-none">
    <div
      role="button"
      className="w-2/12 cursor-pointer flex flex-wrap content-center justify-center px-2 py-1 text-white bg-primary"
      onClick={onClickPrev}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
    <div className="w-8/12 text-center px-2 py-2 text-sm text-white bg-secondary">
      {format(date, "EEEE, dd MMMM yyyy", { locale: id })}
    </div>
    <div
      role="button"
      className="w-2/12 cursor-pointer flex flex-wrap content-center justify-center px-2 py-1 text-white bg-primary"
      onClick={onClickNext}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  </div>
);

const ModalInfo: FC<{ shown: boolean; onClose: () => void }> = ({
  shown,
  onClose,
}) => (
  <Modal shown={shown} size="sm">
    <Modal.Header title="Waktu Salat" onClose={onClose} />
    <Modal.Body>
      <p>
        Data waktu salat dihitung menggunakan pustaka <em>javascript</em>{" "}
        terbuka{" "}
        <ExternalLink href="https://github.com/batoulapps/adhan-js">
          adhan.js
        </ExternalLink>{" "}
        dengan parameter sebagai berikut:
      </p>
      <table className="border w-full text-sm my-3 rounded">
        <tr>
          <td className="border bg-gray-100 px-2 py-1 w-32">Madhab</td>
          <td className="border px-2 py-1">Shafi</td>
        </tr>
        <tr>
          <td className="border bg-gray-100 px-2 py-1 w-32">Fajr Angle</td>
          <td className="border px-2 py-1">20&#186;</td>
        </tr>
        <tr>
          <td className="border bg-gray-100 px-2 py-1 w-32">Isha Angle</td>
          <td className="border px-2 py-1">18&#186;</td>
        </tr>
      </table>
    </Modal.Body>
  </Modal>
);

const PrayTime: FC<{ label: string; time: string }> = ({ label, time }) => (
  <div className="flex px-3 py-2 border-b hover:bg-gray-100">
    <div className="flex-grow text-primary py-1">{label}</div>
    <div className="w-auto font-semibold text-oxford-blue">
      <div className="flex flex-wrap content-center">
        <div className="py-1">
          <span className="inline-block">{time}</span>
        </div>
        <Clock className="ml-2" time={time} />
      </div>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps<PrayTimesPageProps> = async () => {
  const regions = await getRegions();
  return {
    props: {
      regions,
    },
  };
};
