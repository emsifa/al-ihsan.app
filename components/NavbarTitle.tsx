import React, { FC } from "react";

interface NavbarTitleProps {
  icon: string;
  title: string;
}

const NavbarTitle: FC<NavbarTitleProps> = ({ icon, title }) => {
  return (
    <span>
      <img src={icon} alt={title} className="h-5 inline-block mr-2 -mt-1" />
      {title}
    </span>
  );
};

export default NavbarTitle;
