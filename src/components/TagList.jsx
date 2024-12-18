import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";
import Tag from "./Tag";

export default function TagList({ tags, selectedTags, setSelectedTags }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex w-full flex-wrap items-center gap-2 border border-gray bg-light p-2 shadow-md dark:bg-dark">
      {tags.map((tag, index) => (
        <button
          key={tag._id}
          onClick={() => {
            if (selectedTags?.includes(tag._id)) {
              setSelectedTags(selectedTags.filter((t) => t !== tag._id));
            } else {
              setSelectedTags([...selectedTags, tag._id]);
            }
          }}
          className={`border border-gray px-1 font-mono text-xs lowercase ${selectedTags?.includes(tag._id) ? "bg-dark text-light dark:bg-light dark:text-dark" : "bg-light dark:bg-dark"}`}
        >
          {tag.name[language]}
        </button>
      ))}
      <button
        onClick={() => setSelectedTags([])}
        className={`border border-gray px-1 font-mono text-xs lowercase ${selectedTags?.length > 0 ? "bg-dark text-light dark:bg-light dark:text-dark" : "bg-light dark:bg-dark"}`}
      >
        x
      </button>
    </div>
  );
}
