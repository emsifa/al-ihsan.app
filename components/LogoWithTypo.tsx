import React, { FC, HTMLProps } from "react";

const LogoWithTypo: FC<HTMLProps<HTMLImageElement>> = ({ className }) => {
  return (
    <img
      className={className || "inline-block"}
      src="/logo-home.svg"
      alt="Al-Ihsan Apps"
    />
  );
};

export default LogoWithTypo;
