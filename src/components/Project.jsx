import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import { PortableText } from "@portabletext/react";
import Title from "./Title";

export default function Project({ currentItem, setCurrentItem }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  function handleClose() {
    setCurrentItem(null);
    navigate("/");
  }

  return (
    <>
      <div className="pointer-events-none fixed top-11 flex w-full flex-col items-center">
        <Title title={currentItem?.title[language]} handleClose={handleClose} />
        <div className="h-8 w-[1px] bg-gray" />
      </div>
      <div className="pointer-events-none fixed top-48 grid w-full grid-cols-12 items-start px-6">
        <div className="pointer-events-auto col-span-6 col-start-4 flex flex-col items-start gap-4 overflow-auto border border-gray bg-light p-4 px-4 shadow-md dark:bg-dark">
          {currentItem?.description && (
            <PortableText value={currentItem.description[language]} />
          )}
        </div>
      </div>
    </>
  );
}
