import { PrayTimeRegion } from "../types";
import prayTimes from "../data/praytime-region.json";

export async function getRegions(): Promise<PrayTimeRegion[]> {
  return prayTimes;
}
