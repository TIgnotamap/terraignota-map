import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../utils/LanguageContext";
import Title from "./Title";
import { PortableText } from "@portabletext/react";

export default function Index({ people, orgs, refMaterials }) {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  function handleClose() {
    navigate("/");
  }

  return (
    <>
      <div className="pointer-events-none fixed top-11 flex w-full flex-col items-center">
        <Title title="Index" handleClose={handleClose} />
      </div>
      <div className="fixed right-6 top-16 flex items-start gap-2">
        <div className="h-[60vh] w-[33vw] overflow-auto border bg-light dark:bg-dark">
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
    </>
  );
}
