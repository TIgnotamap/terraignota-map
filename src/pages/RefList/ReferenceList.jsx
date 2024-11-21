import { PortableText } from "@portabletext/react";

export default function ReferenceList({ data }) {
  return (
    <>
      {data.references?.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <div>{item.date}</div>
          <div>{item.dateDisplay}</div>
          {item.authors?.map((author) => (
            <p key={author._id}>
              {author._type === "organization"
                ? author.name.en || author.name.es
                : author.pseudonym ||
                  (author.lastName && author.firstName
                    ? `${author.lastName}, ${author.firstName}`
                    : author.lastName || author.firstName)}
            </p>
          ))}
          <PortableText value={item.apaReference} />
          {item.files &&
            item.files.map((file) => (
              <p key={file._key}>
                <a href={file.url} target="_blank" className="underline">
                  file
                </a>
              </p>
            ))}
          {item.links &&
            item.links.map((link, index) => (
              <p key={link + index}>
                <a href={link} target="_blank" className="underline">
                  link
                </a>
              </p>
            ))}
          <hr className="my-4" />
        </div>
      ))}
    </>
  );
}
