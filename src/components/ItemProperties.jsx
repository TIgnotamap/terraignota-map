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
    <div className="grid grid-cols-[1fr_2fr] gap-2">
      {Object.entries(properties).map(
        ([key, value]) =>
          value.length > 0 && (
            <PropertyRow
              key={key}
              propertyKey={key}
              value={value}
              translate={translate}
              language={language}
            />
          ),
      )}
    </div>
  );
}

function PropertyRow({ propertyKey, value, translate, language }) {
  if (!value) return null;

  const displayValue = typeof value === "object" ? value[language] : value;

  return (
    <>
      <span className="text-right text-sm uppercase">
        {translate(propertyKey)}
      </span>
      <span>{displayValue}</span>
    </>
  );
}
