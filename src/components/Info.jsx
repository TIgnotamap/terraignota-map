import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import { PortableText } from "@portabletext/react";
import Title from "./Title";

const components = {
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a href={value.href} rel={rel} className="underline" target="_blank">
          {children}
        </a>
      );
    },
  },
};

export default function Info({ data }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  function handleClose() {
    navigate("/");
  }

  return (
    <>
      <div className="pointer-events-none fixed top-11 flex w-full flex-col items-center">
        <Title title={data?.title[language]} handleClose={handleClose} />
        <div className="h-8 w-[1px] bg-gray" />
      </div>
      <div className="pointer-events-none fixed top-48 grid w-full grid-cols-12 items-start px-6">
        <div className="pointer-events-auto col-span-6 col-start-4 flex h-[60vh] flex-col items-start gap-4 overflow-auto border border-gray bg-light p-4 px-4 shadow-md dark:bg-dark">
          {data.info && (
            <PortableText value={data.info[language]} components={components} />
          )}
          {data.links && (
            <div>
              {data.links.map((link) => {
                return (
                  <a
                    key={link._key}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {link.text[language]}
                  </a>
                );
              })}
            </div>
          )}
          {data.credits && (
            <div>
              <h1 className="font-black">
                {language === "en" ? "Web application" : "Aplicacion web"}
              </h1>
              {data.credits.map((credit) => {
                return (
                  <div key={credit._key}>
                    <span className="">{credit.role[language]}: </span>
                    {credit.subjects?.length > 0 &&
                      credit.subjects.map((subject, index) => {
                        return (
                          <span key={subject._id}>
                            {subject.link ? (
                              <>
                                <a
                                  href={subject.link}
                                  className="underline"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {subject.lastName && subject.firstName && (
                                    <span>
                                      {subject.firstName} {subject.lastName}
                                    </span>
                                  )}
                                  {subject.pseudonym && (
                                    <span>
                                      {" "}
                                      &quot;{subject.pseudonym}&quot;
                                    </span>
                                  )}
                                  {subject.name && (
                                    <span>
                                      {subject.name[language] ||
                                        subject.name.en}
                                    </span>
                                  )}
                                </a>
                                <>
                                  {index < credit.subjects.length - 1 && ", "}
                                </>
                              </>
                            ) : (
                              <>
                                {subject.lastName && subject.firstName && (
                                  <span>
                                    {subject.firstName} {subject.lastName}
                                  </span>
                                )}
                                {subject.pseudonym && (
                                  <span> &quot;{subject.pseudonym}&quot;</span>
                                )}
                                {subject.name && (
                                  <span>
                                    {subject.name[language] || subject.name.en}
                                  </span>
                                )}
                                {index < credit.subjects.length - 1 && ", "}
                              </>
                            )}
                          </span>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <a href="https://maplibre.org/" className="underline">
              MapLibre
            </a>{" "}
            |{" "}
            <a href="https://openfreemap.org/" className="underline">
              OpenFreeMap
            </a>{" "}
            <a href="https://www.openmaptiles.org/" className="underline">
              © OpenMapTiles
            </a>{" "}
            data {language === "en" ? "from" : "de"}{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              className="underline"
            >
              OpenStreetMap
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
