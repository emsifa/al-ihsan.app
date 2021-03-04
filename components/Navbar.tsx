import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, ReactElement } from "react";
import Container from "./Container";

export interface NavbarProps {
  title: string | ReactElement;
  leftButton?: ReactElement;
  rightButton?: ReactElement;
}

const Navbar: FC<NavbarProps> = ({ title, leftButton, rightButton }) => {
  return (
    <div className="fixed text-oxford-blue top-0 left-0 w-full bg-white z-50 shadow-lg h-12">
      <Container>
        <div className="flex w-full h-full">
          <div className="w-1/12 h-100 flex flex-wrap content-center justify-center">
            {leftButton}
          </div>
          <div className="w-10/12 text-center h-100 flex flex-wrap justify-center content-center">
            <h2 className="font-semibold text-xl select-none">
              {title}
            </h2>
          </div>
          <div className="w-1/12 h-100 flex flex-wrap content-center justify-center">
            {rightButton}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
