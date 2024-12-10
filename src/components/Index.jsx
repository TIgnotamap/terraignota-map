import { useContext } from "react";
import { LanguageContext } from "../utils/LanguageContext";
import { NavLink } from "react-router";
import { PortableText } from "@portabletext/react";

export default function Index({ people, orgs, refMaterials }) {
  const { language } = useContext(LanguageContext);

  console.log("refs", refMaterials);

  return (
    <div className="fixed inset-0 flex h-screen items-center justify-center">
      <div className="flex h-2/3 w-2/3 flex-col gap-2 overflow-y-auto border border-gray bg-light p-1 font-serif text-sm dark:bg-dark">
        <NavLink to="/" className="self-end border px-2 font-mono text-xs">
          X
        </NavLink>

        <h2 className="text-4xl">
          {language === "en" ? "People" : "Personas"}
        </h2>
        {people.map((person, index) => (
          <div key={person._id}>
            <div>
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
                  {person.activity.map((act) => act[language])}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs opacity-80">
              {person.participant && (
                <span className="border border-gray">participa</span>
              )}
              {person.referenceAuthor && (
                <span className="border border-gray">autor de ref</span>
              )}
              {person.projectAuthor && (
                <span className="border border-gray">autor de proyecto</span>
              )}
            </div>
          </div>
        ))}

        <h2 className="text-4xl">
          {language === "en" ? "Organizations" : "Organizaciones"}
        </h2>
        {orgs.map((org, index) => (
          <div key={org._id}>
            <div>
              <span className="">{org.name[language] || org.name.en}</span>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs opacity-80">
              {org.participant && (
                <span className="border border-gray">participa</span>
              )}
              {org.referenceAuthor && (
                <span className="border border-gray">autor de ref</span>
              )}
              {org.projectAuthor && (
                <span className="border border-gray">autor de proyecto</span>
              )}
            </div>
          </div>
        ))}

        <h2 className="text-4xl">
          {language === "en" ? "References" : "Referencias"}
        </h2>
        {refMaterials.map((ref, index) => (
          <div key={ref._id}>
            <PortableText value={ref.apaReference} />
          </div>
        ))}
      </div>
    </div>
  );
}
