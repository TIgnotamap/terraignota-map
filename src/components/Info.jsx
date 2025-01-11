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
    <div className="pointer-events-none fixed flex h-screen w-full flex-col items-center px-6 pb-16 pt-11">
      <Title title={data?.title[language]} handleClose={handleClose} />

      <div className="h-6 w-[1px] bg-gray" />

      <div className="pointer-events-auto flex h-full max-w-prose flex-col gap-12 overflow-auto border border-gray bg-light p-4 shadow-md sm:h-[60vh] sm:w-2/3 dark:bg-dark">
        <div>
          {/* <h2 className="pb-6 text-center uppercase">About</h2> */}
          {data.info && (
            <div className="flex flex-col gap-2">
              <PortableText
                value={data.info[language]}
                components={components}
              />
            </div>
          )}
        </div>

        {data.credits && (
          <div className="flex flex-col gap-2">
            {data.credits.map((credit) => {
              return (
                <div key={credit._key}>
                  <span className="text-sm uppercase text-darkGray xl:text-right dark:text-gray">
                    {credit.role[language]}
                  </span>

                  <div>
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
                </div>
              );
            })}
          </div>
        )}

        {data.links && (
          <div>
            <h2 className="text-sm uppercase text-darkGray">Links</h2>
            <div className="flex flex-wrap gap-1">
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
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-darkGray">
          <a href="https://maplibre.org/" className="underline">
            MapLibre
          </a>

          <div className="size-1 rounded-full bg-dark" />

          <a href="https://openfreemap.org/" className="underline">
            OpenFreeMap
          </a>

          <div className="size-1 rounded-full bg-dark" />

          <a href="https://www.openmaptiles.org/" className="underline">
            © OpenMapTiles
          </a>

          <div className="size-1 rounded-full bg-dark" />

          <div>
            data {language === "en" ? "from " : "de "}
            <a
              href="https://www.openstreetmap.org/copyright"
              className="underline"
            >
              OpenStreetMap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
