import adhan from "adhan";
import { PrayTimes } from "../types";

export function getPrayTimes(lat: number, lng: number, date: Date): PrayTimes {
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
  const displayTime = function (date): string {
    const minute = date.getMinutes();
    const hour = date.getHours();
    return (
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute)
    );
  };

  return {
    fajr: displayTime(prayerTimes.fajr),
    sunrise: displayTime(prayerTimes.sunrise),
    dhuhr: displayTime(prayerTimes.dhuhr),
    asr: displayTime(prayerTimes.asr),
    maghrib: displayTime(prayerTimes.maghrib),
    isha: displayTime(prayerTimes.isha),
  };
}
