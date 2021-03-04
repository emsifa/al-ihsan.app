import { createContext } from "react";
import { AppData, BookmarkedVerse } from "../types";

type AppContextType = {
  data: AppData;
  bookmarkedVerseNumber: number | null;
  toggleBookmarkVerse: (verse: BookmarkedVerse) => void;
  toggleStarSurah: (number: number) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;
