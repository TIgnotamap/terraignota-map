import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";
import { PortableText } from "@portabletext/react";
import TagList from "../../components/ui/TagList";

export default function OscItem({ item }) {
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
    type: {
      en: "type",
      es: "tipo",
    },
  };
  const translate = (textKey) => translations[textKey]?.[language] || textKey;

  return (
    <div>
      {/* project */}
      <p>{item.project.title[language]}</p>

      {/* code */}
      <h2>{item.code}</h2>

      {/* date */}
      <div>
        {translate("date")}: {item.date}
      </div>

      {/* tags */}
      {item?.tags && <TagList tags={item.tags} />}

      {/* location */}
      {item.location && <p>{item.location[language]}</p>}

      {/* name */}
      {item.name && <div>{item.name[language]}</div>}

      {/* lat */}
      {item.lat && <div>lat: {item.lat}</div>}
      {/* long */}
      {item.long && <div>long: {item.long}</div>}

      {/* gps */}
      {item.gps && (
        <p className="italic">
          <span>GPS: </span>
          <span>{item.gps}</span>
        </p>
      )}

      {/* L */}
      {item.l && <div>L: {item.l}</div>}
      {/* W */}
      {item.w && <div>W: {item.w}</div>}
      {/* H */}
      {item.h && <div>H: {item.h}</div>}
      {/* kg */}
      {item.kg && <div>{item.kg} kg</div>}

      {/* properties */}
      {item.properties &&
        item.properties.map((property) => (
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

      {/* rockProperties */}
      {item.rockProperties && (
        <>
          {item.rockProperties.type && (
            <div>
              <span>{translate("type")}: </span>
              {item.rockProperties.type[language]}
            </div>
          )}
          {item.rockProperties.class && (
            <div>
              <span>{translate("class")}: </span>
              {item.rockProperties.class[language]}
            </div>
          )}
          {item.rockProperties.texture && (
            <div>
              <span>{translate("texture")}: </span>
              {item.rockProperties.texture[language]}
            </div>
          )}
          {item.rockProperties.color && (
            <div>
              <span>{translate("color")}: </span>
              {item.rockProperties.color[language]}
            </div>
          )}
          {item.rockProperties.composition && (
            <div>
              <span>{translate("composition")}: </span>
              {item.rockProperties.composition[language]}
            </div>
          )}
          {item.rockProperties.genesis && (
            <div>
              <span>{translate("genesis")}: </span>
              {item.rockProperties.genesis[language]}
            </div>
          )}
          {item.rockProperties.depth && (
            <div>
              <span>{translate("depth")}: </span>
              {item.rockProperties.depth[language]}
            </div>
          )}
          {item.rockProperties.age && (
            <div>
              <span>{translate("age")}: </span>
              {item.rockProperties.age[language]}
            </div>
          )}
          {item.rockProperties.physiography && (
            <div>
              <span>{translate("physiography")}: </span>
              {item.rockProperties.physiography[language]}
            </div>
          )}
        </>
      )}

      {/* video */}
      {item.video && (
        <video src={item.video.url || item.video.fileUrl} controls></video>
      )}

      {/* text */}
      {item.text && <PortableText value={item.text[language]} />}

      {/* author/s */}
      {item.text?.authors?.map((author) => (
        <div key={author._id}>
          {author._type === "organization"
            ? author.name.en || author.name.es
            : author.pseudonym ||
              (author.lastName && author.firstName
                ? `${author.lastName}, ${author.firstName}`
                : author.lastName || author.firstName)}
        </div>
      ))}

      {/* images */}
      {item.images && (
        <div className="flex gap-4">
          {item.images.map((image, index) => (
            <img
              src={image.url}
              alt={item.code}
              key={image._key}
              className="w-[175px]"
            />
          ))}
        </div>
      )}

      {/* credits */}
      {item.credits?.map((credit, index) => (
        <div key={credit.subject._id}>
          <span>
            {(credit.subject.lastName &&
              credit.subject.lastName + ", " + credit.subject.firstName) ||
              credit.subject.name[language] ||
              credit.subject.name.en ||
              credit.subject.name.es}
          </span>
          <span>: {credit.role[language]}</span>
        </div>
      ))}

      {/* references */}
      {item.references && (
        <div>
          {item.references.map((reference, index) => (
            <div key={reference._id} className="pb-2 text-xs">
              <PortableText value={reference.apaReference} />
            </div>
          ))}
        </div>
      )}

      {/* links */}
      {item.links &&
        item.links.map((link, index) => (
          <p key={link + index}>
            <a href={link.url} target="_blank" className="underline">
              {link.text[language]}
            </a>
          </p>
        ))}

      {/* condition */}
      {item.condition && (
        <div>
          <span>{translate("condition")}: </span>
          <span>{item.condition[language]}</span>
        </div>
      )}

      {/* isHighlighted */}
      {item.isHighlighted && <div>🕯️</div>}
    </div>
  );
}
