import { faArrowRight, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FC } from "react";
import { BookmarkedVerse } from "../types";

export interface BookmarkLinkCardProps {
  bookmarkedVerse: BookmarkedVerse;
}

const BookmarkLinkCard: FC<BookmarkLinkCardProps> = ({ bookmarkedVerse }) => {
  return (
    <Link
      href={`/al-quran/${bookmarkedVerse.surahNumber}#verse-${bookmarkedVerse.numberInSurah}`}
    >
      <div className="mt-3 flex select-none cursor-pointer rounded px-3 py-2 bg-primary hover:shadow-lg">
        <div className="w-auto px-1 py-1">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-secondary text-3xl"
          />
        </div>
        <div className="flex-grow px-3">
          <p className="text-xs text-floral-white">Penanda</p>
          <p className="text-white font-semibold text-sm">
            {bookmarkedVerse.surahName} ({bookmarkedVerse.surahNumber}:
            {bookmarkedVerse.numberInSurah})
          </p>
        </div>
        <div className="w-auto px-1 py-1">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-floral-white text-3xl"
          />
        </div>
      </div>
    </Link>
  );
};

export default BookmarkLinkCard;
