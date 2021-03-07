import {
  faArrowLeft,
  faInfoCircle,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Input from "../../components/Input";
import LayoutWithNavbar from "../../components/LayoutWithNavbar";
import SurahCard from "../../components/SurahCard";
import useAppContext from "../../hooks/useAppData";
import { getListSurah } from "../../services/al-quran";
import { Surah } from "../../types";
import { classNames } from "../../helpers/utils";
import Modal from "../../components/Modal";
import ExternalLink from "../../components/ExternalLink";
import Code from "../../components/Code";
import NavbarTitle from "../../components/NavbarTitle";

const BookmarkLinkCard = dynamic(
  () => import("../../components/BookmarkLinkCard")
);

interface AlQuranPageProps {
  renderedAt: number;
  listSurah: Surah[];
}

function highlight(text: string, regex: RegExp | null): string {
  return regex ? text.replace(regex, "<u class='text-primary'>$&</u>") : text;
}

const AlQuranPage: NextPage<AlQuranPageProps> = ({ listSurah, renderedAt }) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [searchRegex, setSearchRegex] = useState<RegExp | null>(null);
  const [isFilterStarred, setIsFilterStarred] = useState<boolean>(false);
  const [filteredSurah, setFilteredSurah] = useState<Surah[]>(listSurah);
  const { data, toggleStarSurah } = useAppContext();

  useEffect(() => {
    setSearchRegex(keyword ? new RegExp(keyword, "gi") : null);
  }, [keyword]);

  useEffect(() => {
    const filterStarred = (surah: Surah) => {
      return isFilterStarred
        ? data.quran.starredSurah.indexOf(surah.number) > -1
        : true;
    };

    setFilteredSurah(
      searchRegex
        ? listSurah
            .filter(filterStarred)
            .filter(
              (surah) =>
                surah.name.transliteration.id.match(searchRegex) ||
                surah.name.short.match(searchRegex) ||
                surah.number.toString().match(searchRegex)
            )
        : listSurah.filter(filterStarred)
    );
  }, [searchRegex, isFilterStarred, data]);

  return (
    <LayoutWithNavbar
      navbarTitle={<NavbarTitle title="Al-Qur'an" icon="/icon-quran.svg" />}
      leftButton={
        <Link href="/">
          <span>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" />
          </span>
        </Link>
      }
      rightButton={
        <span onClick={() => setShowInfo(!showInfo)}>
          <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" />
        </span>
      }
    >
      <Head>
        <title>Al-Ihsan Apps &mdash; Al-Qur'an</title>
      </Head>

      <ModalInfo
        shown={showInfo}
        renderedAt={renderedAt}
        onClose={() => setShowInfo(false)}
      />

      <div className="mb-5 w-full">
        {data.quran.bookmarkedVerse && (
          <BookmarkLinkCard bookmarkedVerse={data.quran.bookmarkedVerse} />
        )}

        <div className="mt-3">
          <Input
            value={keyword}
            onChange={(e) => setKeyword((e.target as HTMLInputElement).value)}
            className="w-full"
            placeholder="Cari surah ..."
            leftIcon={
              <span
                className={classNames([
                  "cursor-pointer",
                  !isFilterStarred && "text-gray-200  hover:text-secondary",
                  isFilterStarred && "text-secondary",
                ])}
                onClick={() => setIsFilterStarred(!isFilterStarred)}
              >
                <FontAwesomeIcon icon={faStar} />
              </span>
            }
            rightIcon={<FontAwesomeIcon icon={faSearch} />}
          />
        </div>

        <div className="mt-3 w-full grid grid-cols-2 gap-3">
          {filteredSurah.map((surah) => (
            <SurahCard
              key={surah.number}
              href={`/al-quran/${surah.number}`}
              number={surah.number}
              name={
                <HighlightedText text={surah.name.short} regex={searchRegex} />
              }
              nameLatin={
                <HighlightedText
                  text={surah.name.transliteration.id}
                  regex={searchRegex}
                />
              }
              isStarred={data.quran.starredSurah.indexOf(surah.number) > -1}
              onClickStar={() => toggleStarSurah(surah.number)}
            />
          ))}
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default AlQuranPage;

const HighlightedText: FC<{ text: string; regex: RegExp | null }> = ({
  text,
  regex,
}) => (
  <span
    dangerouslySetInnerHTML={{
      __html: highlight(text, regex),
    }}
  />
);

const ModalInfo: FC<{
  shown: boolean;
  renderedAt: number;
  onClose: () => void;
}> = ({ shown, renderedAt, onClose }) => (
  <Modal shown={shown} size="sm">
    <Modal.Header title="Al-Qur'an" onClose={onClose} />
    <Modal.Body>
      <p>
        Data Al-Qur'an diambil melalui{" "}
        <ExternalLink href="https://en.wikipedia.org/wiki/Representational_state_transfer">
          <em>REST API</em>
        </ExternalLink>{" "}
        dari{" "}
        <ExternalLink href="https://github.com/sutanlab/quran-api">
          Sutanlab Qur'an API
        </ExternalLink>{" "}
        menggunakan endpoint{" "}
        <ExternalLink href="https://api.quran.sutanlab.id/surah">
          <Code>https://api.quran.sutanlab.id/surah</Code>
        </ExternalLink>
      </p>
      <p className="text-sm mt-3 pt-3 border-t mb-1">
        Data pada halaman ini diambil pada:
      </p>
      <Code>
        <small>{new Date(renderedAt).toString()}</small>
      </Code>
    </Modal.Body>
  </Modal>
);

export const getStaticProps: GetStaticProps<AlQuranPageProps> = async () => {
  const listSurah = await getListSurah();
  return {
    props: {
      listSurah,
      renderedAt: new Date().getTime(),
    },
  };
};
