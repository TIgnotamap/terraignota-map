import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";

export default function Info({ data }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="bg-blue-800">
      <h1>{data.title[language]}</h1>
      <div>aca van los settings</div>
      <p>{data.info && data.info[language]}</p>
      <p>{data.hideCredits}</p>
    </div>
  );
}
