import React, { FC } from "react";
import { classNames } from "../helpers/utils";
import Link from "next/link";

interface SquareMenuProps {
  label?: string;
  icon?: string;
  href?: string;
}

const SquareMenu: FC<SquareMenuProps> = ({ href, label, icon }) => {
  const body = (
    <div className="flex flex-wrap h-full justify-center content-center">
      <div>
        <div className="py-2 px-3">
          <img
            src={icon}
            height="48px"
            width="48px"
            className="inline-block clear-both h-12"
            alt={label}
          />
        </div>
        <span className="inline-block">{label}</span>
      </div>
    </div>
  );

  return (
    <div
      className={classNames([
        "w-full",
        "h-full",
        "rounded",
        "p-3",
        "text-sm",
        "text-center",
        "select-none",
        "cursor-pointer",
        "bg-white",
        "transition-all",
        "hover:shadow-lg",
      ])}
    >
      {href && (
        <Link href={href}>
          <a>{body}</a>
        </Link>
      )}
      {!href && body}
    </div>
  );
};

export default SquareMenu;
