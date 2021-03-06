import {
  faBookmark,
  faForward,
  faPlay,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useMemo } from "react";
import { classNames } from "../helpers/utils";

interface VerseCardProps {
  number: number;
  arab: string;
  latin: string;
  translation: string;
  isAudioLoading: boolean;
  isAudioPlaying: boolean;
  isPlayTrack: boolean;
  isBookmarked: boolean;
  onClickPlay: () => void;
  onClickStop: () => void;
  onClickPlayTrack: () => void;
  onClickBookmark: () => void;
}

const VerseCard: FC<VerseCardProps> = ({
  number,
  arab,
  latin,
  isAudioLoading,
  isAudioPlaying,
  isPlayTrack,
  translation,
  isBookmarked,
  onClickPlay,
  onClickPlayTrack,
  onClickStop,
  onClickBookmark,
}) => {
  const playState: "play" | "playtrack" | "none" = useMemo(() => {
    if (isAudioPlaying) {
      return isPlayTrack ? "playtrack" : "play";
    } else {
      return "none";
    }
  }, [isAudioPlaying, isPlayTrack]);

  return (
    <div
      className={classNames([
        "rounded",
        "bg-white",
        "text-sm",
        "relative",
        "w-full",
        "pr-4 py-3 pl-9",
        "select-none",
        "transition-all",
        "text-right",
        !isAudioLoading && playState === "playtrack" && "verse-play-red",
        !isAudioLoading && playState === "play" && "verse-play-green",
      ])}
    >
      <div id={`verse-${number}`} className="invisible bg-blue-500 absolute -top-16 right-0"/>
      {/* <div className="absolute left-0 bottom-0 bg-blue-600 opacity-10 px-3 py-2 font-bold">
        <FontAwesomeIcon icon={faBookmark}/>
      </div> */}
      <div className="absolute cursor-default text-gray-300 left-0 text-center w-8  top-0 py-2 font-semibold">
        <span className={number > 99 ? "text-xs" : "text-sm"}>{number}</span>
      </div>
      <div
        className={classNames([
          "absolute",
          "w-8",
          "text-center",
          "text-xs",
          "left-0",
          "top-9",
          "py-1",
          "font-bold",
          playState === "none" && "text-gray-300 hover:text-primary",
          playState === "play" && "text-primary",
          playState === "playtrack" && "text-violet-red",
        ])}
      >
        {playState === "none" && (
          <span onClick={onClickPlay} role="button">
            <FontAwesomeIcon icon={faPlay} />
          </span>
        )}
        {playState === "play" && !isAudioLoading && (
          <span onClick={onClickPlayTrack} role="button">
            <FontAwesomeIcon icon={faPlay} />
          </span>
        )}
        {playState === "playtrack" && !isAudioLoading && (
          <span onClick={onClickStop} role="button">
            <FontAwesomeIcon icon={faForward} />
          </span>
        )}
        {isAudioPlaying && isAudioLoading && (
          <span>
            <FontAwesomeIcon icon={faSpinner} spin />
          </span>
        )}
      </div>
      <div
        role="button"
        className={classNames([
          "absolute",
          "w-8",
          "text-center",
          "text-xs",
          "left-0",
          "top-16",
          "py-1",
          "font-bold",
          !isBookmarked && "text-gray-300 hover:text-primary hover:opacity-100",
          isBookmarked && "text-primary opacity-100",
        ])}
        onClick={onClickBookmark}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </div>

      <p className="text-oxford-blue font-arab text-2xl select-text" style={{lineHeight:"2.5rem"}}>{arab}</p>
      <p className="text-primary mt-3 text-xs lg:text-sm text-left">{latin}</p>
      <p className="text-oxford-blue text-xs text-left pt-3 mt-3 border-t opacity-75">
        {translation}
      </p>
    </div>
  );
};

export default VerseCard;
