import Head from "next/head";
import React, { FC } from "react";
import Container from "./Container";
import Footer from "./Footer";

const Layout: FC = ({ children }) => {
  return (
    <div className="bg-gray-200 w-full relative py-3">
      <Head>
        <title>Lorem Ipsum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="flex relative min-h-screen w-full sm:flex-wrap justify-center sm:content-center">
          <div className="w-full">
            <main>{children}</main>
            <Footer/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
