import {
  faArrowLeft,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "../../components/Input";
import LayoutWithNavbar from "../../components/LayoutWithNavbar";
import SurahCard from "../../components/SurahCard";
import useAppContext from "../../hooks/useAppData";
import { getListSurah } from "../../services/al-quran";
import { Surah } from "../../types";
import { classNames } from "../../helpers/utils";

const BookmarkLinkCard = dynamic(
  () => import("../../components/BookmarkLinkCard")
);

interface AlQuranPageProps {
  listSurah: Surah[];
}

function highlight(text: string, regex: RegExp | null): string {
  return regex ? text.replace(regex, "<u class='text-primary'>$&</u>") : text;
}

const AlQuranPage: NextPage<AlQuranPageProps> = ({ listSurah }) => {
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
      navbarTitle={
        <span>
          <img
            src="/icon-quran.svg"
            alt="Al-Qur'an"
            className="h-5 inline-block mr-2 -mt-1"
          />
          Al-Qur'an
        </span>
      }
      leftButton={
        <Link href="/">
          <span>
            <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" />
          </span>
        </Link>
      }
    >
      <Head>
        <title>Al-Ihsan Apps &mdash; Al-Qur'an</title>
      </Head>
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
            <div key={surah.number} className="w-full">
              <SurahCard
                key={surah.number}
                href={`/al-quran/${surah.number}`}
                number={surah.number}
                name={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlight(surah.name.short, searchRegex),
                    }}
                  />
                }
                nameLatin={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlight(
                        surah.name.transliteration.id,
                        searchRegex
                      ),
                    }}
                  />
                }
                isStarred={data.quran.starredSurah.indexOf(surah.number) > -1}
                onClickStar={() => toggleStarSurah(surah.number)}
              />
            </div>
          ))}
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default AlQuranPage;

export const getStaticProps: GetStaticProps<AlQuranPageProps> = async (
  context
) => {
  const listSurah = await getListSurah();
  return {
    props: {
      listSurah,
    },
  };
};
