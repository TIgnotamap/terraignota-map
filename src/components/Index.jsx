import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import Title from "./Title";
import { PortableText } from "@portabletext/react";
import { StatusBarContext } from "../utils/StatusBarContext";
import chooseColor from "../utils/chooseColor";

export default function Index({
  people,
  orgs,
  refMaterials,
  data,
  setCurrentItem,
}) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const translations = {
    refAuthor: {
      en: "ref author",
      es: "autor de ref",
    },
    projAuthor: {
      en: "project author",
      es: "autor de proyecto",
    },
    participant: {
      en: "participant",
      es: "participante",
    },
  };

  function handleClose() {
    navigate("/");
  }

  return (
    <>
      <div className="pointer-events-none fixed top-11 flex w-full flex-col items-center">
        <Title title="Index" handleClose={handleClose} />
        <div className="h-8 w-[1px] bg-gray" />
      </div>
      <div className="pointer-events-none fixed top-48 grid w-full grid-cols-12 items-start px-6">
        <div className="pointer-events-auto col-span-6 col-start-4 flex h-[60vh] flex-col gap-4 overflow-auto border border-gray bg-light p-4 shadow-md dark:bg-dark">
          <div>
            <h2 className="text-4xl">
              {language === "en" ? "People" : "Personas"}
            </h2>
            {people.map((person, index) => (
              <div key={person._id} className="my-2 flex items-center gap-2">
                <div className="shrink-0">
                  <span className="">
                    {person.lastName && <span>{person.lastName}</span>}
                    {person.lastName && person.firstName && <span>, </span>}
                    {person.firstName && <span>{person.firstName}</span>}
                    {person.pseudonym && (
                      <span> &quot;{person.pseudonym}&quot;</span>
                    )}
                  </span>
                  {person.activity && (
                    <span className="italic">
                      {" - "}
                      {person.activity.map((act, index) => (
                        <span>
                          {act[language].charAt(0).toUpperCase() +
                            act[language].slice(1)}
                          {person.activity.length > index + 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 font-mono text-xs opacity-80">
                  {person.participant && (
                    <span className="border border-gray px-1">
                      {translations.participant[language]}
                    </span>
                  )}
                  {person.referenceAuthor && (
                    <span className="border border-gray px-1">
                      {translations.refAuthor[language]}
                    </span>
                  )}
                  {person.projectAuthor && (
                    <span className="border border-gray px-1">
                      {translations.projAuthor[language]}
                    </span>
                  )}
                </div>
                <div className="my-1 flex flex-wrap gap-1">
                  {data.items
                    .filter((item) =>
                      item.text?.authors?.some(
                        (author) => author._id === person._id,
                      ),
                    )
                    .map((item) => (
                      <div key={item._id}>
                        <ItemButton
                          item={item}
                          setCurrentItem={setCurrentItem}
                        />
                      </div>
                    ))}
                  {data.items
                    .filter((item) =>
                      item.references?.some((reference) =>
                        reference.authors?.some(
                          (author) => author._id === person._id,
                        ),
                      ),
                    )
                    .map((item) => (
                      <div key={item._id}>
                        <ItemButton
                          item={item}
                          setCurrentItem={setCurrentItem}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-4xl">
              {language === "en" ? "Organizations" : "Organizaciones"}
            </h2>
            {orgs.map((org, index) => (
              <div key={org._id} className="my-2 flex items-center gap-2">
                <div>
                  <span className="">{org.name[language] || org.name.en}</span>
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs opacity-80">
                  {org.participant && (
                    <span className="border border-gray px-1">
                      {translations.participant[language]}
                    </span>
                  )}
                  {org.referenceAuthor && (
                    <span className="border border-gray px-1">
                      {" "}
                      {translations.refAuthor[language]}
                    </span>
                  )}
                  {org.projectAuthor && (
                    <span className="border border-gray px-1">
                      {translations.projAuthor[language]}
                    </span>
                  )}
                </div>
                <div className="my-1 flex gap-1">
                  {data.items
                    .filter((item) =>
                      item.text?.authors?.some(
                        (author) => author._id === org._id,
                      ),
                    )
                    .map((item) => (
                      <div key={item._id}>
                        <ItemButton
                          item={item}
                          setCurrentItem={setCurrentItem}
                        />
                      </div>
                    ))}
                  {data.items
                    .filter((item) =>
                      item.references?.some((reference) =>
                        reference.authors?.some(
                          (author) => author._id === org._id,
                        ),
                      ),
                    )
                    .map((item) => (
                      <div key={item._id}>
                        <ItemButton
                          item={item}
                          setCurrentItem={setCurrentItem}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-4xl">
              {language === "en" ? "References" : "Referencias"}
            </h2>
            {refMaterials.map((ref, index) => (
              <div key={ref._id} className="my-2">
                <PortableText value={ref.apaReference} />
                <div className="my-1 flex gap-1">
                  {data.items
                    .filter((item) =>
                      item.references?.some(
                        (reference) => reference._id === ref._id,
                      ),
                    )
                    .map((item) => (
                      <div key={item._id}>
                        <ItemButton
                          item={item}
                          setCurrentItem={setCurrentItem}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function ItemButton({ item, setCurrentItem }) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);

  return (
    <NavLink
      to={`/${item.slug.current}`}
      onClick={() => setCurrentItem(item)}
      onMouseEnter={() => {
        setStatus(
          item.code.toUpperCase() +
            " " +
            (item.name ? item.name[language] : ""),
        );
      }}
      onMouseLeave={() => {
        setStatus(null);
      }}
    >
      {/* <h3>
        <div
          style={{
            backgroundColor: chooseColor(item.project._id),
            boxShadow: `0 0 1px ${chooseColor(item.project._id)}`,
          }}
          className={`mb-1 mr-0.5 inline-block size-1 rounded-full`}
        />
        {item.code.toUpperCase()} {item.name ? item.name[language] : ""}
      </h3> */}
      <div
        className="max-w flex items-center justify-center border px-1 dark:border-0"
        // style={{
        //   backgroundColor: chooseColor(item.project._id),
        //   boxShadow: `0 0 1px ${chooseColor(item.project._id)}`,
        // }}
      >
        <span className="text-xs text-dark">{item.code}</span>
      </div>
    </NavLink>
  );
}
