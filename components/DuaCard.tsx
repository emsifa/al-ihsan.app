import {
  faBookmark,
  faForward,
  faPlay,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, ReactElement, useMemo } from "react";
import { classNames } from "../helpers/utils";

interface DuaCardProps {
  name: string|ReactElement;
  arabic: string;
  transliteration: string;
  translation: string;
}

const DuaCard: FC<DuaCardProps> = ({
  name,
  arabic,
  transliteration,
  translation
}) => {
  return (
    <div
      className={classNames([
        "rounded",
        "bg-white",
        "text-sm",
        "relative",
        "w-full",
        "py-3",
        "select-none",
        "transition-all",
      ])}
    >
      <h4 className="px-3 mb-3 pb-3 font-semibold text-oxford-blue text-left border-b">{name}</h4>
      <div className="px-3">
        <p className="text-oxford-blue text-right font-arab text-2xl select-text" style={{lineHeight:"2.5rem"}}>{arabic}</p>
        <p className="text-primary mt-3 text-xs lg:text-sm text-left">{transliteration}</p>
        <p className="text-oxford-blue text-xs text-left pt-3 mt-3 border-t opacity-75">
          {translation}
        </p>
      </div>
    </div>
  );
};

export default DuaCard;
