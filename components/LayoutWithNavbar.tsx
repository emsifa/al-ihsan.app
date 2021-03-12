import Head from "next/head";
import React, { FC, ReactElement } from "react";
import Container from "./Container";
import Footer from "./Footer";
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
        <Footer/>
      </Container>
    </div>
  );
};

export default LayoutWithNavbar;
