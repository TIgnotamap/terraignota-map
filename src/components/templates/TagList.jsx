import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";

export default function TagList({ tags }) {
  const { language } = useContext(LanguageContext);

  return (
    <div>
      <span>{tags.length > 1 ? "Tags: " : "Tag: "}</span>
      {tags.map((tag, index) => (
        <span key={tag._id}>
          {tag.name[language]} {index < tags.length - 1 && ","}
        </span>
      ))}
    </div>
  );
}
