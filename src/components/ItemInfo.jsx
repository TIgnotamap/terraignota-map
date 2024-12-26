import { useContext } from "react";
import { PortableText } from "@portabletext/react";
import { LanguageContext } from "../utils/LanguageContext";
import ItemProperties from "./ItemProperties";

export default function ItemInfo({ item }) {
  const { language } = useContext(LanguageContext);

  if (!item) return <div>Loading...</div>;
  if (item.template === "3") return null;

  const dimensions = [item.l, item.w, item.h].filter(Boolean);

  const properties = {
    ...(dimensions.length > 0 && { dimensions: dimensions.join(" x ") }),
    ...(item.kg && { weight: `${item.kg} kg` }),
    ...(item.template === "1" && item.rockProperties
      ? item.rockProperties
      : item.properties),
  };

  const translations = {
    condition: {
      en: "condition",
      es: "condición",
    },
  };

  const hasProperties = Object.keys(properties).length > 0;
  const hasNameOrText = item.name || item.text;

  return (
    <div className="fixed right-6 top-32 max-h-[60vh] w-2/6 overflow-auto border border-gray bg-light px-4 shadow-md dark:bg-dark">
      {hasProperties && (
        <div className={`py-8`}>
          <ItemProperties properties={properties} />
        </div>
      )}

      {hasNameOrText && (
        <>
          {hasProperties && <hr className="border-gray" />}
          <div className={`py-8`}>
            {item.name && (
              <div className="pb-2 font-serif text-xl">
                {item.name[language]}
              </div>
            )}
            {item.text && <PortableText value={item.text[language]} />}
          </div>
        </>
      )}

      {item.references && item.references.length > 0 && (
        <>
          <hr className="border-gray" />
          <div className={`py-8`}>
            {item.references.map((reference) => (
              <PortableText
                key={reference._id}
                value={reference.apaReference}
              />
            ))}
          </div>
        </>
      )}

      {item.links && item.links.length > 0 && (
        <>
          <hr className="border-gray" />
          <div className={`py-8`}>
            {item.links.map((link, index) => (
              <p key={`${link.url}-${index}`}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {link.text[language]}
                </a>
              </p>
            ))}
          </div>
        </>
      )}

      {item.condition && (
        <>
          <hr className="border-gray" />
          <div className={`py-8`}>
            <div className="font-mono text-sm">
              {translations.condition[language]}: {item.condition[language]}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
