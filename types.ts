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
  tafsir: string;
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
