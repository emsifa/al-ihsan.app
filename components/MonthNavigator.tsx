import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback } from "react";
import { dateFormat } from "../helpers/utils";
import { MonthYear } from "../types";

export interface MonthNavigatorProps {
  date: Date;
  onClickPrev: (data: MonthYear) => void;
  onClickNext: (data: MonthYear) => void;
}

const MonthNavigator: FC<MonthNavigatorProps> = ({
  date,
  onClickPrev,
  onClickNext,
}) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const next = useCallback(() => {
    onClickNext({
        month: month === 11 ? 1 : month + 1,
        year: month === 11 ? year + 1 : year,
    });
  }, [onClickNext]);

  const prev = useCallback(() => {
    onClickPrev({
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
    });
  }, [onClickPrev]);

  return (
    <div className="flex rounded overflow-hidden select-none">
      <div
        role="button"
        className="w-2/12 cursor-pointer flex flex-wrap content-center justify-center px-2 py-1 text-white bg-primary"
        onClick={prev}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className="w-8/12 text-center px-2 py-2 text-sm text-white bg-secondary">
        {dateFormat(date, "MMMM yyyy").toUpperCase()}
      </div>
      <div
        role="button"
        className="w-2/12 cursor-pointer flex flex-wrap content-center justify-center px-2 py-1 text-white bg-primary"
        onClick={next}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};

export default MonthNavigator;
