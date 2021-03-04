import Head from "next/head";
import React, { FC } from "react";
import Container from "./Container";

const Layout: FC = ({ children }) => {
  return (
    <div className="bg-gray-200 w-full relative py-5">
      <Head>
        <title>Lorem Ipsum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="flex relative min-h-screen w-full flex-wrap justify-center content-center">
          <div className="w-full">
            <main>{children}</main>
            <footer className="select-none mt-5 shadow-lg bg-primary rounded px-3 py-2 text-xs text-white text-center">
              &copy; 2021 &middot; Majelis Ta'lim Al-Ihsan, Duren Sawit, Jakarta Timur
            </footer>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
