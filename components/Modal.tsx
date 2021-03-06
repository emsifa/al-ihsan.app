import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { classNames } from "../helpers/utils";

interface ModalProps {
  title?: string;
  shown: boolean;
  size?: "lg" | "md" | "sm";
}

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const Modal: FC<ModalProps> & { Body: FC, Header: FC<ModalHeaderProps> } = ({
  shown,
  size = "md",
  children,
}) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [process.browser]);

  useEffect(() => {
    if (document) {
      if (shown) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [shown]);

  return isBrowser
    ? ReactDOM.createPortal(
        <Transition show={shown}>
          <div className="fixed top-0 left-0 w-full h-screen z-50">
            <Transition.Child
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="bg-black opacity-25 fixed top-0 left-0 w-full h-full" />
            </Transition.Child>
            <Transition.Child
              className="overflow-auto"
              enter="transition-all duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 left-0 w-full h-full py-3 lg:py-12 overflow-auto">
                <div className="relative rounded w-full min-h-full flex flex-wrap justify-center content-center">
                  <div
                    className={classNames([
                      "rounded overflow-hidden",
                      size === "sm" && "w-11/12 lg:w-4/12",
                      size === "md" && "w-11/12 lg:w-6/12",
                      size === "lg" && "w-11/12 lg:w-9/12",
                    ])}
                  >
                    {children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Transition>,
        document.body
      )
    : null;
};

const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => (
  <div
    className={classNames([
      "relative",
      "border-b",
      "w-full",
      "bg-white",
      "mx-auto ",
      "border ",
      "px-3 py-2 md:px-5 md:py-2",
    ])}
  >
    <div className="flex select-none">
      <h3 className="flex-grow font-semibold text-oxford-blue">{title}</h3>
      <div className="w-auto">
        <span className="text-gray-300 hover:text-violet-red cursor-pointer" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes}/>
        </span>
      </div>
    </div>
  </div>
);

const ModalBody: FC = ({ children }) => (
  <div
    className={classNames([
      "relative",
      "w-full",
      "bg-white",
      "mx-auto ",
      "border ",
      "p-3 md:p-5",
    ])}
  >
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
