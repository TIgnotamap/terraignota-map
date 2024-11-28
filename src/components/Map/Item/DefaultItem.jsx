import { useContext } from "react";
import { LanguageContext } from "../../../utils/LanguageContext";

import TagList from "../../ui/TagList";
import Date from "../../ui/Date";
import ImageContainer from "../../ui/ImageContainer";
import Video from "../../ui/Video";
import PeopleAndOrganizationsList from "../../PeopleAndOrganizationsList";

import RockProperties from "./RockProperties";
import {
  Code,
  Coordinates,
  Dimensions,
  Properties,
  Condition,
  Name,
  Location,
  ItemText,
  ItemProject,
  ItemCredits,
  ItemReferences,
  ItemLinks,
} from "./ItemComponents";

export default function DefaultItem({ item }) {
  const { language } = useContext(LanguageContext);
  const translations = {
    date: {
      en: "date",
      es: "fecha",
    },
    condition: {
      en: "condition",
      es: "condición",
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
      {item.name && <Name name={item.name} />}

      <Coordinates lat={item.lat} long={item.long} gps={item.gps} />
      <Dimensions l={item.l} w={item.w} h={item.h} kg={item.kg} />

      {item.properties && <Properties properties={item.properties} />}
      {item.rockProperties && (
        <RockProperties properties={item.rockProperties} />
      )}

      {item.video && <Video video={item.video} />}
      {item.text && <ItemText text={item.text} />}
      {item.text?.authors?.length > 0 && (
        <PeopleAndOrganizationsList list={item.text.authors} />
      )}

      {item.images && <ImageContainer images={item.images} />}
      {item.credits && <ItemCredits credits={item.credits} />}
      {item.references && <ItemReferences references={item.references} />}

      {item.links && <ItemLinks links={item.links} />}

      {item.condition && (
        <>
          <span>{translate("condition")}: </span>
          <Condition condition={item.condition} />
        </>
      )}
    </div>
  );
}
