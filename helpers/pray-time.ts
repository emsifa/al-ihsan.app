import adhan from "adhan";
import { PrayTimes } from "../types";

export function getPrayTimes(
  lat: number,
  lng: number,
  date: Date,
  gmt: number
): PrayTimes {
  const coordinates = new adhan.Coordinates(lat, lng);
  const params = adhan.CalculationMethod.Other();
  params.madhab = adhan.Madhab.Shafi;
  params.fajrAngle = 20;
  params.ishaAngle = 18;
  // params.adjustments.fajr = 2;
  // params.adjustments.dhuhr = 2;
  // params.adjustments.asr = 2;
  // params.adjustments.maghrib = 2;
  // params.adjustments.isha = 2;

  const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  const displayTime = function (date: Date, gmt: number): string {
    const offsetHour = date.getTimezoneOffset() / 60;
    const minute = date.getMinutes();
    const hour = date.getHours() + (gmt + offsetHour);
    return (
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute)
    );
  };

  return {
    fajr: displayTime(prayerTimes.fajr, gmt),
    sunrise: displayTime(prayerTimes.sunrise, gmt),
    dhuhr: displayTime(prayerTimes.dhuhr, gmt),
    asr: displayTime(prayerTimes.asr, gmt),
    maghrib: displayTime(prayerTimes.maghrib, gmt),
    isha: displayTime(prayerTimes.isha, gmt),
  };
}
