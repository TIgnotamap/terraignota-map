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
    <div className="overflow-auto border border-gray bg-light px-4 shadow-md sm:max-h-[60vh] dark:bg-dark">
      {hasProperties && (
        <div className="py-8">
          <ItemProperties properties={properties} />
        </div>
      )}

      {hasNameOrText && (
        <>
          {hasProperties && <hr className="border-gray" />}
          <div className="py-8">
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
          <div className="py-8">
            <h3 className="pb-2 font-serif text-xl">
              {language === "en" ? "References" : "Referencias"}
            </h3>
            {item.references.map((reference) => (
              <div key={reference._id} className="flex flex-wrap gap-2 pb-3">
                <PortableText value={reference.apaReference} />
                {(reference.files || reference.links) && ": "}
                {reference.files &&
                  reference.files.map((file) => (
                    <div key={file._key}>
                      <a href={file.url.url} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 -960 960 960"
                          width="18px"
                          fill="#fff"
                          className="invert hover:scale-110 dark:invert-0"
                        >
                          <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                        </svg>
                      </a>
                    </div>
                  ))}
                {reference.links &&
                  reference.links.map((link, index) => (
                    <div key={reference._id + index + link}>
                      <a href={link} target="_blank" className="underline">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 -960 960 960"
                          width="18px"
                          fill="#fff"
                          className="invert hover:scale-110 dark:invert-0"
                        >
                          <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
                        </svg>
                      </a>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}

      {item.links && item.links.length > 0 && (
        <>
          <hr className="border-gray" />
          <div className="py-8">
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
          <div className="py-8">
            <div className="font-mono text-xs">
              {translations.condition[language]}: {item.condition[language]}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
