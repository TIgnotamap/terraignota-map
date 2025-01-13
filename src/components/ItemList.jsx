import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import { StatusBarContext } from "../utils/StatusBarContext";
import chooseColor from "../utils/chooseColor";
import useIsMobile from "../hooks/useIsMobile";

export default function ItemList({
  setCurrentItem,
  filteredItems,
  setHoveredItem,
}) {
  const { language } = useContext(LanguageContext);
  const { setStatus } = useContext(StatusBarContext);
  const isMobile = useIsMobile();

  const translations = {
    link: {
      en: "External link",
      es: "Link externo",
    },
  };

  return (
    <div className="pointer-events-auto h-full w-full overflow-auto border border-gray bg-light p-1 shadow-md md:w-[calc((100vw-1.5rem)/12*3-1.5rem)] lg:w-[calc((100vw-3rem)/6-1.5rem)] dark:bg-dark">
      <ul>
        {filteredItems?.map((item) => (
          <li className="font-serif" key={item._id}>
            {item._type === "exhibition" ? (
              <a
                href={item.link}
                target="_blank"
                onMouseEnter={() => {
                  if (!isMobile) {
                    setHoveredItem(item);
                    setStatus(
                      "[" +
                        item.code?.toUpperCase() +
                        "]" +
                        " " +
                        (item.name ? item.name[language] : "") +
                        (item.title ? item.title[language] : "") +
                        " (" +
                        translations.link[language].toLowerCase() +
                        ")",
                    );
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredItem(null);
                    setStatus(null);
                  }
                }}
                className="flex cursor-alias items-center gap-1 hover:underline"
              >
                <div
                  style={{
                    backgroundColor:
                      item._type === "exhibition"
                        ? "#fff"
                        : chooseColor(item.project?._id),
                    boxShadow: `0 0 1px ${item._type === "exhibition" ? "#fff" : chooseColor(item.project?._id)}`,
                  }}
                  className={`mb-1 mr-0.5 inline-block size-1 rounded-full invert dark:invert-0`}
                />
                {item.code && "[" + item.code?.toUpperCase() + "]"}{" "}
                {item.title ? item.title[language] : ""}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  className="dark:invert"
                >
                  <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
                </svg>
              </a>
            ) : (
              <NavLink
                to={`/${item.slug.current}`}
                onClick={() => setCurrentItem(item)}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setHoveredItem(item);
                    setStatus(
                      "[" +
                        item.code?.toUpperCase() +
                        "]" +
                        " " +
                        (item.name ? item.name[language] : "") +
                        (item.title ? item.title[language] : ""),
                    );
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredItem(null);
                    setStatus(null);
                  }
                }}
                className={({ isActive }) =>
                  isActive ? "underline" : "sm:hover:underline"
                }
              >
                <h3>
                  <div
                    style={{
                      backgroundColor:
                        item._type === "exhibition"
                          ? "#fff"
                          : chooseColor(item.project?._id),
                      boxShadow: `0 0 1px ${item._type === "exhibition" ? "#fff" : chooseColor(item.project?._id)}`,
                    }}
                    className={`mb-1 mr-0.5 inline-block size-1 rounded-full`}
                  />
                  {item.code && "[" + item.code?.toUpperCase() + "]"}{" "}
                  {item.name ? item.name[language] : ""}
                </h3>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
