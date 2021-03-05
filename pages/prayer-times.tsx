import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faMapMarkerAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays } from "date-fns";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Clock from "../components/Clock";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import Select from "../components/Select";
import { getPrayTimes } from "../helpers/pray-time";
import { getRegions } from "../services/prayer-times";
import { PrayTimes } from "../types";

const PrayTimesPage: NextPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [prayTimes, setPrayTimes] = useState<PrayTimes | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const {
    data: regions,
    isLoading: isLoadingRegions,
    error: regionsError,
  } = useQuery("regions", getRegions);

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
        <span>
          <img
            src="/icon-salat-clock.svg"
            alt="Waktu Salat"
            className="h-5 inline-block mr-2 -mt-1"
          />
          Waktu Salat
        </span>
      }
      leftButton={
        <Link href="/">
          <span>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" />
          </span>
        </Link>
      }
    >
      <Head>
        <title>Al-Ihsan Apps &mdash; Waktu Salat</title>
      </Head>
      <div className="mb-5 w-full mt-3">
        <Select
          className={isLoadingRegions && "text-gray-400"}
          leftIcon={
            <FontAwesomeIcon
              className={selectedRegion ? "text-primary" : "text-gray-300"}
              icon={faMapMarkerAlt}
            />
          }
          rightIcon={
            isLoadingRegions ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )
          }
          onChange={(e) =>
            setSelectedRegion((e.target as HTMLSelectElement).value)
          }
        >
          {isLoadingRegions && <option>Mengambil data wilayah...</option>}
          {(regions || []).map((region) => (
            <option value={region.id}>{region.name}</option>
          ))}
        </Select>
        <div className="flex rounded overflow-hidden mt-3 select-none">
          <div
            role="button"
            className="w-2/12 cursor-pointer flex flex-wrap content-center justify-center px-2 py-1 text-white bg-primary"
            onClick={() => setDate(addDays(date, -1))}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="w-8/12 text-center px-2 py-2 text-sm text-white bg-secondary">
            {format(date, "EEEE, dd MMMM yyyy", { locale: id })}
          </div>
          <div
            role="button"
            className="w-2/12 cursor-pointer flex flex-wrap content-center justify-center px-2 py-1 text-white bg-primary"
            onClick={() => setDate(addDays(date, 1))}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
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

const PrayTime: FC<{ label: string; time: string }> = ({ label, time }) => (
  <div className="flex px-3 py-2 border-b hover:bg-gray-100">
    <div className="flex-grow text-primary py-1">{label}</div>
    <div className="w-auto font-semibold text-oxford-blue">
      <div className="flex flex-wrap content-center">
        <div className="py-1">
          <span className="inline-block">{time}</span>
        </div>
        <Clock className="ml-2" time={time}/>
      </div>
    </div>
  </div>
);