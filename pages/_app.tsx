import type { AppProps } from "next/app";
import Head from "next/head";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { useMemo, useState } from "react";
import { AppData, BookmarkedVerse, Verse } from "../types";
import { getData, persistData } from "../services/data";
import AppContext from "../context/AppContext";
import "../styles/globals.css";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<AppData>(getData());

  function toggleBookmarkVerse(verse: BookmarkedVerse) {
    setData((data) => {
      if (
        data.quran.bookmarkedVerse &&
        data.quran.bookmarkedVerse.numberInQuran === verse.numberInQuran
      ) {
        data.quran.bookmarkedVerse = null;
      } else {
        data.quran.bookmarkedVerse = verse;
      }

      persistData(data);
      return { ...data };
    });
  }

  function toggleStarSurah(number: number) {
    setData((data) => {
      const isStarred = data.quran.starredSurah.indexOf(number) > -1;
      if (isStarred) {
        data.quran.starredSurah = data.quran.starredSurah.filter(
          (n) => n !== number
        );
      } else {
        data.quran.starredSurah = [...data.quran.starredSurah, number];
      }

      persistData(data);
      return { ...data };
    });
  }

  const bookmarkedVerseNumber = useMemo(() => {
    return data.quran.bookmarkedVerse
      ? data.quran.bookmarkedVerse.numberInQuran
      : null;
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        data,
        toggleBookmarkVerse,
        toggleStarSurah,
        bookmarkedVerseNumber,
      }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Mirza&display=swap" rel="stylesheet"/>
        <style>{dom.css()}</style>
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
