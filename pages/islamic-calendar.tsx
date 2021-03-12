import { FC, useEffect, useMemo, useState } from "react";
import {
  faArrowLeft,
  faArrowRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format, isFriday, isSunday } from "date-fns";
import { useQuery } from "react-query";
import { NextPage } from "next";
import Link from "next/link";
import id from "date-fns/locale/id";
import LayoutWithNavbar from "../components/LayoutWithNavbar";
import { getCalendarDates } from "../helpers/calendar";
import { CalendarEvent, DateConversion, HijriMonth } from "../types";
import { classNames } from "../helpers/utils";
import { getCalendarEvents } from "../services/calendar-events";
import Modal from "../components/Modal";
import Code from "../components/Code";
import ExternalLink from "../components/ExternalLink";
import NavbarTitle from "../components/NavbarTitle";
import { Transition } from "@headlessui/react";
import Head from "../components/Head";

type MonthYear = {
  month: number;
  year: number;
};

const IslamicCalendarPage: NextPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [today] = useState<Date>(new Date(format(new Date(), "yyyy-MM-dd")));
  const [{ month, year }, setMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const { data: events } = useQuery("events", getCalendarEvents);

  const [dates, setDates] = useState<DateConversion[]>(
    getCalendarDates(new Date())
  );

  const date = useMemo(() => {
    const d = new Date();
    d.setMonth(month);
    d.setFullYear(year);
    d.setDate(1);

    return d;
  }, [month, year]);

  const displayEvents: {
    event: CalendarEvent;
    date: DateConversion;
  }[] = useMemo(() => {
    if (!events) {
      return [];
    }

    const dateIndexes: { [key: string]: DateConversion } = dates
      .filter((date) => !date.isOtherMonth)
      .reduce((indexes, date) => {
        indexes[`${date.hijri.day}/${date.hijri.month.index + 1}`] = date;
        return indexes;
      }, {});

    return events
      .filter((event) => dateIndexes[`${event.day}/${event.month}`])
      .map((event) => ({
        event,
        date: dateIndexes[`${event.day}/${event.month}`],
      }));
  }, [dates, events]);

  const months: HijriMonth[] = useMemo(() => {
    return dates
      .filter((date) => !date.isOtherMonth)
      .reduce(
        (result, date) =>
          result.findIndex((m) => m.index === date.hijri.month.index) > -1
            ? result
            : [...result, date.hijri.month],
        []
      );
  }, [dates]);

  useEffect(() => {
    setDates(getCalendarDates(date));
  }, [date]);

  function next() {
    setMonthYear(({ month, year }) => {
      return {
        month: month === 11 ? 1 : month + 1,
        year: month === 11 ? year + 1 : year,
      };
    });
  }

  function prev() {
    setMonthYear(({ month, year }) => {
      return {
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
      };
    });
  }

  return (
    <LayoutWithNavbar
      navbarTitle={
        <NavbarTitle title="Kalender Islam" icon="/icon-islamic-calendar.svg" />
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
        title="Kalender Islam"
        description="Informasi kalender islam dengan nama bulan hijriyah dan hari-hari spesial islam"
      />

      <ModalInfo shown={showInfo} onClose={() => setShowInfo(false)} />

      <div className="mb-5 w-full mt-3">
        <div className="mt-3">
          <CalendarNavigator
            date={date}
            onClickPrev={prev}
            onClickNext={next}
          />
        </div>

        <div className="mt-3">
          <Calendar dates={dates} today={today} />
        </div>

        <div className="mt-3">
          <MonthsInfo months={months} />
        </div>

        {displayEvents.length > 0 && (
          <div className="mt-3">
            <h4 className="mb-2 text-gray-500 font-semibold">Hari Spesial</h4>
            {displayEvents.map((data) => (
              <CardEvent event={data.event} date={data.date} />
            ))}
          </div>
        )}
      </div>
    </LayoutWithNavbar>
  );
};

export default IslamicCalendarPage;

const CalendarNavigator: FC<{
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
      {format(date, "MMMM yyyy", { locale: id }).toUpperCase()}
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

const Calendar: FC<{ dates: DateConversion[]; today: Date }> = ({
  dates,
  today,
}) => (
  <div className="rounded overflow-hidden bg-white w-full grid grid-cols-7">
    {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
      <div
        key={day}
        className="select-none text-center border-b text-sm font-semibold px-2 py-1 bg-oxford-blue text-white"
      >
        {day}
      </div>
    ))}
    {dates.map((date) => {
      const isToday =
        !date.isOtherMonth &&
        format(today, "ddMMyyyy") === format(date.date, "ddMMyyyy");

      const isMonth = (date: DateConversion, monthIndex: number): boolean =>
        date.hijri.month.index === monthIndex;

      return (
        <div
          key={date.date.toLocaleString()}
          className={classNames([
            "select-none rounded cursor-default text-center",
            date.isOtherMonth && "opacity-20",
            !isToday && "z-0",
            isToday && "border-2 font-bold shadow-lg z-10",
            isToday && isMonth(date, 0) && "border-muharram-500",
            isToday && isMonth(date, 1) && "border-shafar-500",
            isToday && isMonth(date, 2) && "border-rabiul-awal-500",
            isToday && isMonth(date, 3) && "border-rabiul-akhir-500",
            isToday && isMonth(date, 4) && "border-jumadil-awal-500",
            isToday && isMonth(date, 5) && "border-jumadil-akhir-500",
            isToday && isMonth(date, 6) && "border-rajab-500",
            isToday && isMonth(date, 7) && "border-syaban-500",
            isToday && isMonth(date, 8) && "border-ramadhan-500",
            isToday && isMonth(date, 9) && "border-syawal-500",
            isToday && isMonth(date, 10) && "border-zulqaidah-500",
            isToday && isMonth(date, 11) && "border-zulhijjah-500",
          ])}
        >
          <span
            className={classNames([
              "inline-block p-2 text-sm",
              isSunday(date.date) && "text-violet-red font-semibold",
              isFriday(date.date) && "text-primary font-semibold",
            ])}
          >
            {format(date.date, "d", { locale: id })}
          </span>
          <span
            className={classNames([
              "w-full block text-white text-xs overflow-hidden font-semibold px-1 overflow-ellipsis whitespace-nowrap",
              isMonth(date, 0) && "bg-muharram-500",
              isMonth(date, 1) && "bg-shafar-500",
              isMonth(date, 2) && "bg-rabiul-awal-500",
              isMonth(date, 3) && "bg-rabiul-akhir-500",
              isMonth(date, 4) && "bg-jumadil-awal-500",
              isMonth(date, 5) && "bg-jumadil-akhir-500",
              isMonth(date, 6) && "bg-rajab-500",
              isMonth(date, 7) && "bg-syaban-500",
              isMonth(date, 8) && "bg-ramadhan-500",
              isMonth(date, 9) && "bg-syawal-500",
              isMonth(date, 10) && "bg-zulqaidah-500",
              isMonth(date, 11) && "bg-zulhijjah-500",
            ])}
          >
            {date.hijri.day}
          </span>
        </div>
      );
    })}
  </div>
);

const MonthsInfo: FC<{ months: HijriMonth[] }> = ({ months }) => (
  <div className="flex content-center">
    {months.map((month) => (
      <div className="text-sm flex flex-wrap content-center justify-center select-none hover:bg-white rounded px-1 py-1 mr-2">
        <span
          className={classNames([
            "inline-block w-4 h-4 mr-2 rounded",
            month.index === 0 && "bg-muharram-500",
            month.index === 1 && "bg-shafar-500",
            month.index === 2 && "bg-rabiul-awal-500",
            month.index === 3 && "bg-rabiul-akhir-500",
            month.index === 4 && "bg-jumadil-awal-500",
            month.index === 5 && "bg-jumadil-akhir-500",
            month.index === 6 && "bg-rajab-500",
            month.index === 7 && "bg-syaban-500",
            month.index === 8 && "bg-ramadhan-500",
            month.index === 9 && "bg-syawal-500",
            month.index === 10 && "bg-zulqaidah-500",
            month.index === 11 && "bg-zulhijjah-500",
          ])}
        />
        <span className="inline-block -mt-1 text-oxford-blue opacity-75">
          {month.name}
        </span>
      </div>
    ))}
  </div>
);

const CardEvent: FC<{ event: CalendarEvent; date: DateConversion }> = ({
  date,
  event,
}) => (
  <Transition
    appear={true}
    show={true}
    enter="transition-opacity duration-150"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="rounded bg-white w-full px-3 py-2 mb-3 select-none">
      <div className="flex">
        <div className="flex-grow">
          <p className="text-sm">
            <span className="font-semibold text-primary">
              {date.hijri.day} {date.hijri.month.name}
            </span>
            <span className="mx-2 opacity-20">/</span>
            <small className="text-secondary font-semibold">
              {format(date.date, "EEEE, dd MMMM", {
                locale: id,
              })}
            </small>
          </p>
          <h4 className="text-lg font-semibold text-oxford-blue">
            {event.name}
          </h4>
        </div>
        <div className="w-auto text-2xl flex flex-wrap content-center justify-center">
          <a
            className="text-gray-300 hover:text-primary"
            href={event.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </a>
        </div>
      </div>
    </div>
  </Transition>
);

const ModalInfo: FC<{ shown: boolean; onClose: () => void }> = ({
  shown,
  onClose,
}) => (
  <Modal shown={shown} size="sm">
    <Modal.Header title="Kalender Islam" onClose={onClose} />
    <Modal.Body>
      <p>
        Data penanggalan hijriah diambil menggunakan fungsi bawaan{" "}
        <em>javascript</em>{" "}
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat">
          <Code>Intl.DateTimeFormat</Code>
        </ExternalLink>{" "}
        dengan format <em>locale</em> <Code>id-TN-u-ca-islamic-umalqura</Code>.
      </p>
    </Modal.Body>
  </Modal>
);
