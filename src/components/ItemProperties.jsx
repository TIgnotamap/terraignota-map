import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";

const translations = {
  dimensions: { en: "Dimensions", es: "Dimensiones" },
  weight: { en: "Weight", es: "Peso" },
  type: { en: "Type", es: "Tipo" },
  class: { en: "Class", es: "Clase" },
  texture: { en: "Texture", es: "Textura" },
  color: { en: "Color", es: "Color" },
  composition: { en: "Composition", es: "Composición" },
  genesis: { en: "Genesis", es: "Génesis" },
  depth: { en: "Depth", es: "Profundidad" },
  age: { en: "Age", es: "Edad" },
  physiography: { en: "Physiography", es: "Fisiografía" },
};

export default function ItemProperties({ properties }) {
  const { language } = useContext(LanguageContext);

  const translate = (key) => translations[key]?.[language] || key;

  return (
    <div className="grid xl:grid-cols-[1fr_3fr] xl:gap-2">
      {Object.entries(properties).map(([key, value]) => {
        return (
          <PropertyRow
            key={key}
            propertyKey={key}
            value={value}
            translate={translate}
            language={language}
          />
        );
      })}
    </div>
  );
}

function PropertyRow({ propertyKey, value, translate, language }) {
  const displayValue = typeof value === "object" ? value[language] : value;

  if (displayValue == undefined) return null;

  return (
    <>
      <span className="text-sm uppercase text-darkGray xl:text-right dark:text-gray">
        {translate(propertyKey)}
      </span>
      <span className="pb-4 xl:pb-0">{displayValue}</span>
    </>
  );
}
