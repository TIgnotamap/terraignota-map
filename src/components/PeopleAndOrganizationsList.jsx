import Subject from "./Subject";

export default function PeopleAndOrganizationsList({ list }) {
  return (
    <>
      {list.map((subject) => (
        <Subject key={subject._id} subject={subject} />
      ))}
    </>
  );
}
