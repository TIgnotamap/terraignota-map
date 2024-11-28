import { useContext } from "react";
import { LanguageContext } from "../../../utils/LanguageContext";

import TagList from "../../ui/TagList";
import Date from "../../ui/Date";
import Video from "../../ui/Video";

import {
  Code,
  Coordinates,
  Location,
  ItemProject,
  ItemCredits,
} from "./ItemComponents";

export default function PerspectiveItem({ item }) {
  const { language } = useContext(LanguageContext);
  const translations = {
    date: {
      en: "date",
      es: "fecha",
    },
  };
  const translate = (textKey) => translations[textKey]?.[language] || textKey;

  return (
    <div>
      <Code code={item.code} />
      <ItemProject project={item.project.title} />
      <div>
        {translate("date")}: <Date date={item.date} />
      </div>

      {item?.tags && <TagList tags={item.tags} />}
      {item.location && <Location location={item.location} />}

      <Coordinates lat={item.lat} long={item.long} gps={item.gps} />

      {item.video && <Video video={item.video} />}

      {item.credits && <ItemCredits credits={item.credits} />}
    </div>
  );
}
