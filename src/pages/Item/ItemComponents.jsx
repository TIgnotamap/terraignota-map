import { LanguageContext } from "../../utils/LanguageContext";
import { useContext } from "react";
import Subject from "../../components/Subject";
import { PortableText } from "@portabletext/react";

export function Code({ code }) {
  return <>{code}</>;
}

export function Condition({ condition }) {
  const { language } = useContext(LanguageContext);
  return <>{condition[language]}</>;
}

export function Coordinates({ lat, long, gps }) {
  return (
    <>
      {lat && <div>lat: {lat}</div>}
      {long && <div>long: {long}</div>}
      {gps && (
        <p className="italic">
          <span>GPS: </span>
          <span>{gps}</span>
        </p>
      )}
    </>
  );
}

export function Dimensions({ l, w, h, kg }) {
  return (
    <>
      {l && <div>L: {l}</div>}
      {w && <div>W: {w}</div>}
      {h && <div>H: {h}</div>}
      {kg && <div>{kg} kg</div>}
    </>
  );
}

export function ItemCredits({ credits }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      {credits.map((credit, index) => (
        <div key={credit.subject._id}>
          <span>
            <Subject subject={credit.subject} />
          </span>
          <span>: {credit.role[language]}</span>
        </div>
      ))}
    </>
  );
}

export function ItemProject({ project }) {
  const { language } = useContext(LanguageContext);

  return <>{project[language]}</>;
}

export function ItemText({ text }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <PortableText value={text[language]} />
    </>
  );
}

export function Location({ location }) {
  const { language } = useContext(LanguageContext);
  return <>{location[language]}</>;
}

export function Name({ name }) {
  const { language } = useContext(LanguageContext);

  return <>{name[language]}</>;
}

export function Properties({ properties }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      {properties &&
        properties?.map((property) => (
          <div key={property._key}>
            <span>{property.propName && property.propName[language]}: </span>
            {(property.propValue?.shortValuesList &&
              property.propValue?.shortValuesList.map((value) => (
                <span key={value._key}>{value[language]}, </span>
              ))) ||
              (property.propValue.longValue && (
                <span>{property.propValue.longValue[language]}</span>
              ))}
          </div>
        ))}
    </>
  );
}

export function ItemReferences({ references }) {
  return (
    <div>
      {references.map((reference, index) => (
        <div key={reference._id}>
          <PortableText value={reference.apaReference} />
        </div>
      ))}
    </div>
  );
}

export function ItemLinks({ links }) {
  const { language } = useContext(LanguageContext);
  return (
    <>
      {links.map((link, index) => (
        <p key={link + index}>
          <a href={link.url} target="_blank" className="underline">
            {link.text[language]}
          </a>
        </p>
      ))}
    </>
  );
}
