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

  const authors = people.filter((person) => person.projectAuthor);

  const blockComponents = {
    block: {
      normal: ({ children }) => <span className="">{children}</span>,
    },
  };

  return (
    <div className="pointer-events-none fixed flex h-screen w-full flex-col px-6 pb-16 pt-11">
      <Title title="Index" handleClose={handleClose} />

      <div className="mx-auto h-8 w-[1px] bg-gray" />

      <div className="pointer-events-auto mx-auto flex h-full max-w-4xl flex-col gap-12 overflow-auto border border-gray bg-light p-4 shadow-md sm:h-[60vh] sm:w-2/3 dark:bg-dark">
        <div>
          <h2 className="pb-6 text-center uppercase">
            {language === "en" ? "Authors" : "Autores"}
          </h2>

          {authors.map((person, index) => (
            <span className="text-xl" key={person._id}>
              <span>
                {person.lastName && person.lastName}
                {person.lastName && person.firstName && ", "}
                {person.firstName && person.firstName}
                {person.pseudonym && ` "${person.pseudonym}"`}
              </span>

              {person.activity &&
                person.activity.map((act, index) => (
                  <span
                    key={index}
                    className="text-base uppercase text-darkGray"
                  >
                    {" "}
                    {act[language].charAt(0).toUpperCase() +
                      act[language].slice(1)}
                    {person.activity.length > index + 1 ? ", " : ""}
                  </span>
                ))}

              {data.items
                .filter((item) =>
                  item.text?.authors?.some(
                    (author) => author._id === person._id,
                  ),
                )
                .map((item) => (
                  <span key={item._id}>
                    <ItemButton item={item} setCurrentItem={setCurrentItem} />
                  </span>
                ))}
            </span>
          ))}
        </div>

        <div>
          <h2 className="pb-6 text-center uppercase">
            {language === "en" ? "References" : "Referencias"}
          </h2>

          <div className="flex flex-col gap-2">
            {refMaterials.map((ref, index) => (
              <div key={ref._id}>
                <PortableText
                  value={ref.apaReference}
                  components={blockComponents}
                />
                {data.items
                  .filter((item) =>
                    item.references?.some(
                      (reference) => reference._id === ref._id,
                    ),
                  )
                  .map((item) => (
                    <span key={item._id}>
                      <ItemButton item={item} setCurrentItem={setCurrentItem} />
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
      className={`inline-block -translate-y-1 px-0.5 hover:underline`}
    >
      <div className="font-serif text-sm leading-tight">({item.code})</div>
    </NavLink>
  );
}
