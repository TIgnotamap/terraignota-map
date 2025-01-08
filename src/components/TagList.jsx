import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";
import chooseColor from "../utils/chooseColor";

export default function TagList({
  tags,
  selectedTags,
  setSelectedTags,
  currentItem,
  items,
}) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="pointer-events-auto flex h-auto w-full shrink-0 flex-wrap items-center gap-1 overflow-auto">
      {tags.map((tag) => {
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
                ? "bg-dark text-light dark:bg-light dark:text-dark"
                : "bg-light dark:bg-dark"
            } ${!isRelevant ? "cursor-not-allowed text-gray" : ""}`}
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
        className={`rounded-full border border-gray px-2 font-mono text-xs lowercase shadow-lg ${
          selectedTags?.length > 0
            ? "bg-dark text-light dark:bg-light dark:text-dark"
            : "bg-light dark:bg-dark"
        }`}
      >
        x
      </button>
    </div>
  );
}
