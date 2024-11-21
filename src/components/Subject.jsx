export default function Subject({ subject }) {
  return (
    <span>
      {subject._type === "organization"
        ? subject.name.en || subject.name.es
        : subject.pseudonym ||
          (subject.lastName && subject.firstName
            ? `${subject.lastName}, ${subject.firstName}`
            : subject.lastName || subject.firstName)}
    </span>
  );
}
