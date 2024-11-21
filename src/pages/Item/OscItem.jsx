import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";

import TagList from "../../components/ui/TagList";
import Date from "../../components/ui/Date";
import ImageContainer from "../../components/ui/ImageContainer";
import Video from "../../components/ui/Video";

import {
  Code,
  Coordinates,
  Location,
  ItemText,
  ItemProject,
  ItemCredits,
  ItemLinks,
} from "./ItemComponents";

export default function OscItem({ item }) {
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
      {item.text && <ItemText text={item.text} />}
      {item.images && <ImageContainer images={item.images} />}
      {item.credits && <ItemCredits credits={item.credits} />}

      {item.links && <ItemLinks links={item.links} />}
    </div>
  );
}
