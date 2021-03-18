import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faInfoCircle,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays } from "date-fns";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Clock from "../components/Clock";
import DateNavigator from "../components/DateNavigator";
import ExternalLink from "../components/ExternalLink";
import Head from "../components/Head";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import Modal from "../components/Modal";
import MonthNavigator from "../components/MonthNavigator";
import NavbarTitle from "../components/NavbarTitle";
import Select from "../components/Select";
import { getDatesInMonth } from "../helpers/calendar";
import { getPrayTimes } from "../helpers/pray-time";
import { classNames, dateFormat, isSameDate } from "../helpers/utils";
import { getRegions } from "../services/prayer-times";
import { MonthYear, PrayTimeRegion, PrayTimes } from "../types";

interface PrayTimesPageProps {
  regions: PrayTimeRegion[];
}

type MonthPrayTimes = (PrayTimes & { date: Date })[];

const PrayTimesPage: NextPage<PrayTimesPageProps> = ({ regions }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [tab, setTab] = useState<"month" | "day">("day");
  const [date, setDate] = useState<Date>(new Date());
  const [{ month, year }, setMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [dayPrayTimes, setDayPrayTimes] = useState<PrayTimes | null>(null);
  const [monthPrayTimes, setMonthPrayTimes] = useState<MonthPrayTimes | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedRegion && regions) {
      setSelectedRegion(regions[0].id);
    }
  }, [regions, selectedRegion]);

  useEffect(() => {
    const region = (regions || []).find((r) => r.id === selectedRegion);
    setDayPrayTimes(
      region ? getPrayTimes(region.lat, region.lng, date, region.gmt) : null
    );
  }, [date, selectedRegion, regions]);

  useEffect(() => {
    const region = (regions || []).find((r) => r.id === selectedRegion);

    setMonthPrayTimes(
      region
        ? getDatesInMonth({ month, year }).map((date: Date) => ({
            date,
            ...getPrayTimes(region.lat, region.lng, date, region.gmt),
          }))
        : null
    );
  }, [month, year, selectedRegion, regions]);

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
      <Head
        title={`Waktu Salat`}
        description={`Waktu salat untuk wilayah Indonesia`}
      />

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
          <div className="grid grid-cols-2 gap-2">
            <TabButton active={tab === "day"} onClick={() => setTab("day")}>
              HARI
            </TabButton>
            <TabButton active={tab === "month"} onClick={() => setTab("month")}>
              BULAN
            </TabButton>
          </div>
          <div className="bg-white rounded-bl rounded-br p-3">
            {tab === "month" && (
              <div>
                <MonthNavigator
                  date={new Date(year, month, 1)}
                  onClickPrev={(monthYear) => setMonthYear(monthYear)}
                  onClickNext={(monthYear) => setMonthYear(monthYear)}
                />
                {monthPrayTimes && (
                  <MonthPrayTimes prayTimes={monthPrayTimes} />
                )}
              </div>
            )}
            {tab === "day" && (
              <div>
                <DateNavigator
                  date={date}
                  onClickPrev={() => setDate(addDays(date, -1))}
                  onClickNext={() => setDate(addDays(date, 1))}
                />
                {dayPrayTimes && <DayPrayTimes prayTimes={dayPrayTimes} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default PrayTimesPage;

const TabButton: FC<{ active: boolean; onClick: () => void }> = ({
  active,
  children,
  onClick,
}) => (
  <div
    role="button"
    className={classNames([
      "rounded-tl rounded-tr p-3 cursor-pointer text-center bg-white",
      !active && "opacity-30 hover:opacity-50",
    ])}
    onClick={onClick}
  >
    {children}
  </div>
);

const MonthPrayTimes: FC<{ prayTimes: MonthPrayTimes }> = ({ prayTimes }) => (
  <table className="w-full border text-center mt-3 text-sm">
    <thead>
      <tr>
        <th className="border">Tgl.</th>
        <th className="border">Sub</th>
        <th className="border">Zuh</th>
        <th className="border">Ash</th>
        <th className="border">Mag</th>
        <th className="border">Isya</th>
      </tr>
    </thead>
    <tbody>
      {prayTimes.map((prayTime, i) => (
        <tr
          className={classNames([
            isSameDate(new Date(), prayTime.date)
              ? "hover:bg-primary"
              : "hover:bg-gray-200",
            isSameDate(new Date(), prayTime.date)
              ? "bg-secondary text-white"
              : i % 2 === 0 && "bg-gray-100",
          ])}
        >
          <td className="border">{dateFormat(prayTime.date, "d")}</td>
          <td className="border">{prayTime.fajr}</td>
          <td className="border">{prayTime.dhuhr}</td>
          <td className="border">{prayTime.asr}</td>
          <td className="border">{prayTime.maghrib}</td>
          <td className="border">{prayTime.isha}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const DayPrayTimes: FC<{ prayTimes: PrayTimes }> = ({ prayTimes }) => (
  <div className="rounded border bg-white mt-3 select-none overflow-hidden">
    <PrayTime label="Subuh" time={`${prayTimes.fajr}`} />
    <PrayTime label="Zuhur" time={`${prayTimes.dhuhr}`} />
    <PrayTime label="Ashar" time={`${prayTimes.asr}`} />
    <PrayTime label="Maghrib" time={`${prayTimes.maghrib}`} />
    <PrayTime label="Isya" time={`${prayTimes.isha}`} />
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
