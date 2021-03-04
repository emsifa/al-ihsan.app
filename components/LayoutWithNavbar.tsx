import Head from "next/head";
import React, { FC, ReactElement } from "react";
import Container from "./Container";
import Navbar from "./Navbar";

interface LayoutWithNavbarProps {
  navbarTitle: string | ReactElement;
  leftButton?: ReactElement;
  rightButton?: ReactElement;
}

const LayoutWithNavbar: FC<LayoutWithNavbarProps> = ({
  navbarTitle,
  children,
  leftButton,
  rightButton,
}) => {
  return (
    <div className="bg-gray-200 w-full min-h-screen relative pb-5 pt-12">
      <Head>
        <title>Lorem Ipsum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        title={navbarTitle}
        leftButton={leftButton}
        rightButton={rightButton}
      />
      <Container>
        <main>{children}</main>
        <footer className="select-none mt-5 shadow-lg bg-primary rounded px-3 py-2 text-xs text-white text-center">
          &copy; 2021 &middot; Majelis Ta'lim Al-Ihsan, Duren Sawit, Jakarta
          Timur
        </footer>
      </Container>
    </div>
  );
};

export default LayoutWithNavbar;
