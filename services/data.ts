import { AppData } from "../types";

const DATA_KEY = "app_data";

const defaultData: AppData = {
  quran: {
    bookmarkedVerse: null,
    starredSurah: [1, 36],
  },
};

export function persistData(data: AppData) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function getData(): AppData {
  try {
    return (
      (JSON.parse(localStorage.getItem(DATA_KEY)) as AppData) || defaultData
    );
  } catch (e) {
    return defaultData;
  }
}
