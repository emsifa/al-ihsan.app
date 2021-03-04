import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { FC, ReactElement } from "react";
import { classNames } from "../helpers/utils";

interface SurahCardProps {
  number: number;
  name: string | ReactElement;
  nameLatin: string | ReactElement;
  href: string;
  isStarred: boolean;
  onClickStar: () => void;
}

const SurahCard: FC<SurahCardProps> = ({
  number,
  name,
  nameLatin,
  href,
  isStarred,
  onClickStar,
}) => {
  return (
    <Link href={href}>
      <div
        className={classNames([
          "rounded",
          "bg-white",
          "text-sm",
          "cursor-pointer",
          "relative",
          "w-full",
          "px-4 py-3",
          "select-none",
          "transition-all",
          "hover:shadow-lg",
          "text-right",
        ])}
      >
        <span className="absolute left-0 top-0 text-gray-300 w-10 text-center py-2 font-bold">
          {number}
        </span>
        <span
          role="button"
          className={classNames([
            "absolute left-0 top-7 font-bold py-1 w-10 text-center",
            !isStarred && "text-gray-200 hover:text-secondary",
            isStarred && "text-secondary",
          ])}
          onClick={(e) => {
            e.stopPropagation();
            onClickStar();
          }}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span className="text-primary">{name}</span>
        <br />
        <span className="font-semibold text-oxford-blue">{nameLatin}</span>
      </div>
    </Link>
  );
};

export default SurahCard;
