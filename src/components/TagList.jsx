import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";
import chooseColor from "../utils/chooseColor";
import { StatusBarContext } from "../utils/StatusBarContext";
import useIsMobile from "../hooks/useIsMobile";

export default function TagList({
  tags,
  selectedTags,
  setSelectedTags,
  currentItem,
  items,
}) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);
  const isMobile = useIsMobile();

  const translations = {
    clearAllFilters: {
      en: "Clear all tag filters",
      es: "Borrar todos los filtros por etiqueta",
    },
  };

  return (
    <div className="pointer-events-auto flex h-auto w-full shrink-0 flex-wrap items-center gap-1 overflow-auto">
      {tags
        .filter((tag) =>
          items.some((item) =>
            item.tags?.some((itemTag) => itemTag._id === tag._id),
          ),
        )
        .map((tag) => {
          const isRelevant = selectedTags.length
            ? items.some(
                (item) =>
                  selectedTags.every((selectedTag) =>
                    item.tags?.some((itemTag) => itemTag._id === selectedTag),
                  ) && item.tags?.some((itemTag) => itemTag._id === tag._id),
              )
            : true;

          return (
            <button
              key={tag._id}
              onMouseEnter={() =>
                !isMobile &&
                tag.description &&
                setStatus(tag.description[language])
              }
              onMouseLeave={() => !isMobile && setStatus(null)}
              onClick={() => {
                if (isRelevant) {
                  if (selectedTags?.includes(tag._id)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag._id));
                  } else {
                    setSelectedTags([...selectedTags, tag._id]);
                  }
                }
              }}
              className={`${tag.geographic ? "" : "rounded-full"} border px-2 font-mono text-xs lowercase shadow-lg ${
                selectedTags?.includes(tag._id)
                  ? "bg-dark text-light sm:hover:bg-darkGray dark:bg-light dark:text-dark dark:sm:hover:bg-lightGray"
                  : !isRelevant
                    ? "cursor-auto bg-light text-gray sm:hover:bg-light dark:bg-dark dark:sm:hover:bg-dark"
                    : "sm:text bg-light sm:hover:bg-lightGray dark:bg-dark dark:sm:hover:bg-darkGray"
              }`}
              disabled={!isRelevant}
              style={{
                borderColor: `${currentItem?.tags?.some((itemTag) => itemTag._id === tag._id) ? chooseColor(currentItem?.project._id) : "gray"}`,
              }}
            >
              {tag.name[language]}
            </button>
          );
        })}
      <button
        onClick={() => setSelectedTags([])}
        onMouseEnter={() =>
          !isMobile && setStatus(translations.clearAllFilters[language])
        }
        onMouseLeave={() => !isMobile && setStatus(null)}
        className={`rounded-full border border-gray px-2 font-mono text-xs lowercase shadow-lg ${
          selectedTags?.length > 0
            ? "bg-dark text-light sm:hover:bg-darkGray dark:bg-light dark:text-dark dark:sm:hover:bg-lightGray"
            : "cursor-auto bg-light text-gray sm:hover:bg-light dark:bg-dark dark:sm:hover:bg-dark"
        }`}
      >
        x
      </button>
    </div>
  );
}
