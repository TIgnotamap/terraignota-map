import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";
import Tag from "./Tag";

export default function TagList({ tags }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span key={tag._id}>
          <Tag name={tag.name[language]} />
        </span>
      ))}
    </div>
  );
}
