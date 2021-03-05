import axios from "axios";
import { PrayTimeRegion } from "../types";

export async function getRegions(): Promise<PrayTimeRegion[]> {
  const response = await axios.get("/data/praytime-region.json");
  return response.data;
}
