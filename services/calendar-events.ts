import axios from "axios";
import { CalendarEvent, PrayTimeRegion } from "../types";

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const response = await axios.get("/data/calendar-events.json");
  return response.data;
}
