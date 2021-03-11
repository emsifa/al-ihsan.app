export interface Surah {
  number: number;
  sequence: number;
  numberOfVerses: number;
  name: {
    short: string;
    long: string;
    transliteration: {
      en: string;
      id: string;
    };
    translation: {
      en: string;
      id: string;
    };
  };
  revelation: {
    arab: string;
    en: string;
    id: string;
  };
  tafsir: {
    id: string;
  };
}

export interface Verse {
  number: {
    inQuran: number;
    inSurah: number;
  };
  meta: {
    juz: number;
    page: number;
    manzil: number;
    ruku: number;
    hizbQuarter: number;
    sajda: {
      recommended: boolean;
      obligatory: boolean;
    };
  };
  text: {
    arab: string;
    transliteration: {
      en: string;
    };
  };
  translation: {
    en: string;
    id: string;
  };
  audio: {
    primary: string;
    secondary: string[];
  };
  tafsir: {
    id: {
      long: string;
      short: string;
    };
  };
}

export interface SurahDetail extends Surah {
  preBismillah: {
    text: {
      arab: string;
      transliteration: {
        en: string;
      };
    };
    translation: {
      en: string;
      id: string;
    };
    audio: {
      primary: string;
      secondary: string[];
    };
  };
  verses: Verse[];
}

export interface PrevAndNextSurah {
  prev: Surah | null;
  next: Surah | null;
}

export interface BookmarkedVerse {
  surahNumber: number;
  surahName: string;
  numberInQuran: number;
  numberInSurah: number;
}

export interface AppData {
  quran: {
    bookmarkedVerse: null | BookmarkedVerse;
    starredSurah: number[];
  };
}

export interface PrayTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface PrayTimeRegion {
  id: string;
  name: string;
  lat: number;
  lng: number;
  gmt: number;
}

export interface HijriMonth {
  index: number;
  name: string;
}

export interface HijriDate {
  day: number;
  year: number;
  month: HijriMonth;
}

export interface DateConversion {
  hijri: HijriDate;
  date: Date;
  dateStr: string;
  isOtherMonth: boolean;
}

export interface CalendarEvent {
  day: number;
  month: number;
  name: string;
  url: string;
}

export interface Dua {
  name: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
}

export type NumberSeparator = "comma" | "period" | "space";
