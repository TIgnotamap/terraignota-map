export default function Tag({ name }) {
  return (
    <span className="bg-light dark:bg-dark border-gray border p-1 font-mono text-xs lowercase">
      {name}
    </span>
  );
}
