import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";
import Tag from "./Tag";

export default function TagList({ tags, selectedTags, setSelectedTags }) {
  const { language } = useContext(LanguageContext);

  console.log("selectedTags", selectedTags);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((tag, index) => (
        <span
          key={tag._id}
          onClick={() => {
            if (selectedTags?.includes(tag._id)) {
              setSelectedTags(selectedTags.filter((t) => t !== tag._id));
            } else {
              setSelectedTags([...selectedTags, tag._id]);
            }
          }}
          className={`${selectedTags?.includes(tag._id) ? "bg-primary" : ""} cursor-pointer`}
        >
          <Tag name={tag.name[language]} />
        </span>
      ))}
      <span onClick={() => setSelectedTags([])} className="cursor-pointer">
        <Tag name="x" />
      </span>
    </div>
  );
}
