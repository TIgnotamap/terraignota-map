import { LanguageContext } from "../../../utils/LanguageContext";
import { useContext } from "react";

export default function RockProperties({ properties }) {
  const { language } = useContext(LanguageContext);

  const translations = {
    type: {
      en: "type",
      es: "tipo",
    },
    class: {
      en: "class",
      es: "clase",
    },
    texture: {
      en: "texture",
      es: "textura",
    },
    color: {
      en: "color",
      es: "color",
    },
    composition: {
      en: "composition",
      es: "composición",
    },
    genesis: {
      en: "genesis",
      es: "genesis",
    },
    depth: {
      en: "depth",
      es: "profundidad",
    },
    age: {
      en: "age",
      es: "edad",
    },
    physiography: {
      en: "physiography",
      es: "fisiografía",
    },
  };
  const translate = (textKey) => translations[textKey]?.[language] || textKey;

  return (
    <>
      {properties.type && (
        <div>
          <span>{translate("type")}: </span>
          {properties.type[language]}
        </div>
      )}
      {properties.class && (
        <div>
          <span>{translate("class")}: </span>
          {properties.class[language]}
        </div>
      )}
      {properties.texture && (
        <div>
          <span>{translate("texture")}: </span>
          {properties.texture[language]}
        </div>
      )}
      {properties.color && (
        <div>
          <span>{translate("color")}: </span>
          {properties.color[language]}
        </div>
      )}
      {properties.composition && (
        <div>
          <span>{translate("composition")}: </span>
          {properties.composition[language]}
        </div>
      )}
      {properties.genesis && (
        <div>
          <span>{translate("genesis")}: </span>
          {properties.genesis[language]}
        </div>
      )}
      {properties.depth && (
        <div>
          <span>{translate("depth")}: </span>
          {properties.depth[language]}
        </div>
      )}
      {properties.age && (
        <div>
          <span>{translate("age")}: </span>
          {properties.age[language]}
        </div>
      )}
      {properties.physiography && (
        <div>
          <span>{translate("physiography")}: </span>
          {properties.physiography[language]}
        </div>
      )}
    </>
  );
}
