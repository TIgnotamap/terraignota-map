import { useContext, useEffect } from "react";
import { StatusBarContext } from "../../utils/StatusBarContext";
import { LanguageContext } from "../../utils/LanguageContext";

export default function StatusBar({ data, filteredItems }) {
  const { status, defaultStatus, setDefaultStatus } =
    useContext(StatusBarContext);
  const { language } = useContext(LanguageContext);
  const translations = {
    exhibitionSingular: {
      en: "exhibition",
      es: "exhibición",
    },
    exhibitionPlural: {
      en: "exhibitions",
      es: "exhibiciones",
    },
  };

  useEffect(() => {
    let itemCount = 0;
    let exhibitionCount = 0;

    filteredItems.forEach((i) => {
      if (i._type === "exhibition") {
        exhibitionCount++;
      } else {
        itemCount++;
      }
    });

    setDefaultStatus(
      `${itemCount}/${data?.items?.length} items, ${exhibitionCount}/${data?.exhibitions?.length} ${data?.exhibitions?.length > 1 ? translations.exhibitionPlural[language] : translations.exhibitionSingular[language]}`,
    );
  }, [data, filteredItems, language]);

  return (
    <div className="pointer-events-none fixed left-[5rem] top-4 z-10 max-w-[33vw] select-none rounded-md border border-lightGray bg-light px-2 py-0.5 font-mono text-xs text-darkGray dark:border-darkGray dark:bg-dark dark:text-gray">
      {status || defaultStatus}
    </div>
  );
}
