import axios from "axios";
import { PrevAndNextSurah, Surah, SurahDetail } from "../types";

export async function getListSurah(): Promise<Surah[]> {
  const response = await axios.get("https://api.quran.sutanlab.id/surah");
  return response.data.data;
}

export async function getDetailSurah(number: number): Promise<SurahDetail> {
  const response = await axios.get(
    `https://api.quran.sutanlab.id/surah/${number}`
  );
  return response.data.data;
}

export async function getPrevAndNextSurah(
  number: number
): Promise<PrevAndNextSurah> {
  const listSurah = await getListSurah();
  const index = listSurah.findIndex((surah) => surah.number === number);

  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? listSurah[index - 1] : null,
    next: listSurah[index + 1] || null,
  };
}
