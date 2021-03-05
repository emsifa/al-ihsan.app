import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, HTMLProps } from "react";
import { mergeClasses } from "../helpers/utils";

export interface ClockProps extends HTMLProps<HTMLSpanElement> {
  time: string;
}

function hourDeg(hour: number): number {
  return (hour - 3) * 30;
}

function minuteDeg(minute: number): number {
  return (minute - 15) * 6;
}

const Clock: FC<ClockProps> = ({ time, className }) => {
  const [hour, minute] = time.split(":");
  return (
    <div className={mergeClasses(className, ["inline-block"])}>
      <svg viewBox="0 0 40 40" className="w-8 h-8" style={{
        fill: "white",
        stroke: "black",
        strokeWidth: "3",
        strokeLinecap: "round",
      }}>
        <circle cx="20" cy="20" r="19" className="stroke-oxford-blue" />
        <line x1="0" y1="0" x2="9" y2="0" className="hour stroke-primary" style={{
          strokeWidth: 3,
          transform: `translate(20px, 20px) rotate(${hourDeg(parseInt(hour) + (parseInt(minute) / 60))}deg)`
        }} />
        <line x1="0" y1="0" x2="13" y2="0" className="minute stroke-secondary" style={{
          strokeWidth: 3,
          transform: `translate(20px, 20px) rotate(${minuteDeg(parseInt(minute))}deg)`
        }} />
        </svg>
    </div>
  );
};

export default Clock;
