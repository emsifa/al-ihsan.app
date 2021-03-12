import React, { FC } from "react";
import NextHead from "next/head";
import { useRouter } from "next/dist/client/router";

export interface HeadProps {
  title?: string;
  description?: string;
  path?: string;
}

const Head: FC<HeadProps> = ({ title, description }) => {
  const router = useRouter();

  return (
    <NextHead>
      <title>{title ? `${title} | Al-Ihsan Apps` : `Al-Ihsan Apps`}</title>
      <meta name="description" content={description || "Kumpulan aplikasi dan informasi islami"}/>
      <link rel="canonical" href={`https://al-ihsan.app${router.pathname}`} />
    </NextHead>
  );
};

export default Head;
