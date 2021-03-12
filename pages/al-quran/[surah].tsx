import {
  faArrowLeft,
  faBars,
  faChevronLeft,
  faChevronRight,
  faForward,
  faInfoCircle,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import LayoutWithNavbar from "../../components/LayoutWithNavbar";
import VerseCard from "../../components/VerseCard";
import { mergeClasses } from "../../helpers/utils";
import useAppContext from "../../hooks/useAppData";
import {
  getDetailSurah,
  getListSurah,
  getPrevAndNextSurah,
} from "../../services/al-quran";
import { PrevAndNextSurah, SurahDetail } from "../../types";
import Modal from "../../components/Modal";
import ExternalLink from "../../components/ExternalLink";
import Code from "../../components/Code";
import NavbarTitle from "../../components/NavbarTitle";
import Head from "../../components/Head";

interface SurahPageProps {
  renderedAt: number;
  surah: SurahDetail;
  metadata: PrevAndNextSurah;
}

interface SurahPageState {
  showModalInfo: boolean;
  isAudioLoading: boolean;
  isPlayTrack: boolean;
  audioSrc: string | null;
  playedVerseNumber: number | null;
}

type SurahPageAction =
  | { type: "play_all"; src: string }
  | { type: "play_audio"; src: string; verseNumber?: number }
  | { type: "set_audio_loading"; loading: boolean }
  | { type: "set_play_track"; playTrack: boolean }
  | { type: "set_show_modal_info"; show: boolean }
  | { type: "stop_audio" };

function reducer(state: SurahPageState, action: SurahPageAction) {
  switch (action.type) {
    case "play_all": {
      state.audioSrc = action.src;
      state.playedVerseNumber = null;
      state.isPlayTrack = true;
      break;
    }
    case "play_audio": {
      state.audioSrc = action.src;
      state.playedVerseNumber = action.verseNumber || null;
      break;
    }
    case "set_audio_loading": {
      state.isAudioLoading = action.loading;
      break;
    }
    case "set_play_track": {
      state.isPlayTrack = action.playTrack;
      break;
    }
    case "stop_audio": {
      state.isPlayTrack = false;
      state.playedVerseNumber = null;
      state.audioSrc = null;
      state.isAudioLoading = false;
      break;
    }
    case "set_show_modal_info": {
      state.showModalInfo = action.show;
      break;
    }
  }
}

const initialState: SurahPageState = {
  isAudioLoading: false,
  isPlayTrack: false,
  audioSrc: null,
  playedVerseNumber: null,
  showModalInfo: false,
};

const SurahPage: NextPage<SurahPageProps> = ({
  surah,
  renderedAt,
  metadata,
}) => {
  const { bookmarkedVerseNumber, toggleBookmarkVerse } = useAppContext();
  const [audio, setAudio] = useState<HTMLAudioElement>(null);
  const [
    { isAudioLoading, isPlayTrack, audioSrc, playedVerseNumber, showModalInfo },
    dispatch,
  ] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (process.browser) {
      setAudio(new Audio());
    }
  }, [process]);

  useEffect(() => {
    if (!audio) {
      return;
    }

    if (audioSrc) {
      audio.src = audioSrc;
    } else {
      audio.src = "";
      audio.pause();
    }

    return () => audio && audio.pause();
  }, [audio, audioSrc]);

  useEffect(() => {
    if (!audio) {
      return;
    }

    audio.onloadstart = () =>
      dispatch({ type: "set_audio_loading", loading: true });
    audio.oncanplay = () => {
      dispatch({ type: "set_audio_loading", loading: false });
      audio.play();
    };

    audio.onended = () => {
      const playTrackIsAtPreVerse =
        isPlayTrack && audioSrc && playedVerseNumber === null;
      const playTrackIsInVerse = isPlayTrack && audioSrc && playedVerseNumber;

      if (playTrackIsInVerse) {
        const verseIndex = surah.verses.findIndex(
          (verse) => verse.number.inSurah === playedVerseNumber
        );
        const nextVerse = surah.verses[verseIndex + 1];
        if (nextVerse) {
          dispatch({
            type: "play_audio",
            src: nextVerse.audio.primary,
            verseNumber: nextVerse.number.inSurah,
          });
        } else {
          dispatch({ type: "stop_audio" });
        }
      } else if (playTrackIsAtPreVerse) {
        const firstVerse = surah.verses[0];
        dispatch({
          type: "play_audio",
          src: firstVerse.audio.primary,
          verseNumber: firstVerse.number.inSurah,
        });
      } else {
        dispatch({ type: "stop_audio" });
      }
    };
  }, [audio, surah, playedVerseNumber, isPlayTrack]);

  if (!surah) {
    return <span>Surah Data Not Found</span>;
  }

  return (
    <LayoutWithNavbar
      navbarTitle={
        <NavbarTitle
          title={`Surah ${surah.name.transliteration.id}`}
          icon="/icon-quran.svg"
        />
      }
      leftButton={
        <Link href="/al-quran">
          <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" />
        </Link>
      }
      rightButton={
        <span
          onClick={() =>
            dispatch({ type: "set_show_modal_info", show: !showModalInfo })
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" />
        </span>
      }
    >
      <Head
        title={`Al-Qur'an Surah ${surah.name.transliteration.id}`}
        description={`Bacaan Al-Qur'an surah ${surah.name.transliteration.id} dengan audio dan terjemahan Bahasa Indonesia`}
      />
      <ModalInfo
        shown={showModalInfo}
        renderedAt={renderedAt}
        surah={surah}
        onClose={() => dispatch({ type: "set_show_modal_info", show: false })}
      />

      <div className="mb-5 w-full">
        <div className="mt-5 w-full grid grid-cols-1 gap-4">
          {surah.preBismillah && (
            <div className="flex px-1 w-full justify-between content-center text-oxford-blue text-2xl mb-3">
              <div className="w-auto">
                {!isPlayTrack && (
                  <ButtonCircle
                    className="bg-gray-400 hover:bg-violet-red hover:shadow-lg"
                    icon={faForward}
                    onClick={() =>
                      dispatch({
                        type: "play_all",
                        src: surah.preBismillah.audio.primary,
                      })
                    }
                  />
                )}
                {isPlayTrack && playedVerseNumber && (
                  <ButtonCircle
                    className="bg-gray-400 hover:bg-violet-red hover:shadow-lg"
                    icon={faForward}
                    onClick={() =>
                      dispatch({
                        type: "play_all",
                        src: surah.preBismillah.audio.primary,
                      })
                    }
                  />
                )}
                {isPlayTrack && !playedVerseNumber && (
                  <ButtonCircle
                    className="bg-violet-red hover:shadow-lg"
                    icon={faPause}
                    onClick={() =>
                      dispatch({
                        type: "stop_audio",
                      })
                    }
                  />
                )}
              </div>
              <h4 className="font-arab text-3xl inline-block opacity-75">
                {surah.preBismillah.text.arab}
              </h4>
            </div>
          )}
          {surah.verses.map((verse) => (
            <div key={verse.number.inSurah} className="w-full">
              <VerseCard
                key={verse.number.inSurah}
                number={verse.number.inSurah}
                arab={verse.text.arab}
                latin={verse.text.transliteration.en}
                translation={verse.translation.id}
                isBookmarked={bookmarkedVerseNumber === verse.number.inQuran}
                isAudioLoading={isAudioLoading}
                isAudioPlaying={playedVerseNumber === verse.number.inSurah}
                isPlayTrack={isPlayTrack}
                onClickPlay={() =>
                  dispatch({
                    type: "play_audio",
                    src: verse.audio.primary,
                    verseNumber: verse.number.inSurah,
                  })
                }
                onClickPlayTrack={() =>
                  dispatch({ type: "set_play_track", playTrack: true })
                }
                onClickStop={() => dispatch({ type: "stop_audio" })}
                onClickBookmark={() => {
                  toggleBookmarkVerse({
                    surahNumber: surah.number,
                    surahName: surah.name.transliteration.id,
                    numberInQuran: verse.number.inQuran,
                    numberInSurah: verse.number.inSurah,
                  });
                }}
              />
            </div>
          ))}
          <div className="flex flex-wrap w-full">
            <div className="w-5/12 text-center">
              {metadata.prev && (
                <Link href={`/al-quran/${metadata.prev.number}`}>
                  <a
                    role="button"
                    className="w-full inline-block cursor-pointer bg-oxford-blue text-white px-2 py-2 text-sm rounded overflow-ellipsis"
                  >
                    <span className="inline-block mr-2">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    {metadata.prev.name.transliteration.id}
                  </a>
                </Link>
              )}
            </div>
            <div className="w-2/12 text-center px-2">
              <Link href="/al-quran">
                <a
                  role="button"
                  className="w-full inline-block cursor-pointer rounded bg-secondary text-white text-center px-2 py-2 text-sm"
                >
                  <FontAwesomeIcon icon={faBars} />
                </a>
              </Link>
            </div>
            <div className="w-5/12 text-center">
              {metadata.next && (
                <Link href={`/al-quran/${metadata.next.number}`}>
                  <a
                    role="button"
                    className="w-full inline-block cursor-pointer bg-oxford-blue text-white px-2 py-2 text-sm rounded overflow-ellipsis"
                  >
                    {metadata.next.name.transliteration.id}
                    <span className="inline-block ml-2">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutWithNavbar>
  );
};

export default SurahPage;

const ModalInfo: FC<{
  shown: boolean;
  surah: SurahDetail;
  renderedAt: number;
  onClose: () => void;
}> = ({ shown, surah, renderedAt, onClose }) => (
  <Modal shown={shown} size="sm">
    <Modal.Header
      title={`Surah ${surah.name.transliteration.id}`}
      onClose={onClose}
    />
    <Modal.Body>
      <p className="text-sm">{surah.tafsir.id}</p>
      <hr className="my-3" />
      <p>
        Data surah ini diambil melalui{" "}
        <ExternalLink href="https://en.wikipedia.org/wiki/Representational_state_transfer">
          <em>REST API</em>
        </ExternalLink>{" "}
        dari{" "}
        <ExternalLink href="https://github.com/sutanlab/quran-api">
          Sutanlab Qur'an API
        </ExternalLink>{" "}
        menggunakan endpoint{" "}
        <ExternalLink
          href={`https://api.quran.sutanlab.id/surah/${surah.number}`}
        >
          <Code>https://api.quran.sutanlab.id/surah/{surah.number}</Code>
        </ExternalLink>
      </p>
      <hr className="my-3" />
      <p className="text-sm mb-1">Data pada halaman ini diambil pada:</p>
      <Code>
        <small>{new Date(renderedAt).toString()}</small>
      </Code>
    </Modal.Body>
  </Modal>
);

const ButtonCircle: FC<{
  className: string;
  onClick: () => void;
  icon: IconDefinition;
}> = ({ className, onClick, icon }) => (
  <div
    role="button"
    className={mergeClasses(
      [
        "cursor-pointer inline-block rounded-full w-7 h-7",
        "text-center leading-6 text-sm text-white",
      ],
      className
    )}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={icon} />
  </div>
);

interface SurahPageContext {
  params: {
    surah: string;
  };
}

export const getStaticProps: GetStaticProps<SurahPageProps> = async ({
  params,
}: SurahPageContext) => {
  const surah = await getDetailSurah(parseInt(params.surah));
  const prevAndNext = await getPrevAndNextSurah(surah.number);
  return {
    props: {
      surah,
      metadata: prevAndNext,
      renderedAt: new Date().getTime(),
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ surah: string }> = async () => {
  const listSurah = await getListSurah();
  return {
    paths: listSurah.map((surah) => ({
      params: {
        surah: surah.number.toString(),
      },
    })),
    fallback: false,
  };
};
