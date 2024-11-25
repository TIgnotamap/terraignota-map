import { useContext } from "react";
import { LanguageContext } from "../../utils/LanguageContext";
import { NavLink } from "react-router";

export default function Credits({ people }) {
  const { language } = useContext(LanguageContext);

  return (
    <div className="fixed inset-0 flex h-screen flex-col gap-2 overflow-auto border bg-white p-2 dark:bg-black">
      <NavLink to="/terraignota-map" className="self-end border px-2 font-mono">
        X
      </NavLink>

      {people.map((person, index) => (
        <div key={person._id}>
          <div>
            <span className="font-bold">
              {person.lastName && <span>{person.lastName}</span>}
              {person.lastName && person.firstName && <span>, </span>}
              {person.firstName && <span>{person.firstName}</span>}
              {person.pseudonym && <span> &quot;{person.pseudonym}&quot;</span>}
            </span>
            {person.activity && (
              <span className="italic">
                {" "}
                {person.activity.map((act) => act[language])}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-sm opacity-80">
            {person.participant && <span className="border">participa</span>}
            {person.referenceAuthor && (
              <span className="border">autor de ref</span>
            )}
            {person.projectAuthor && (
              <span className="border">autor de proyecto</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
