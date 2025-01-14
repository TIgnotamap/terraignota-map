export default function Tag({ name }) {
  return (
    <button className="border border-gray bg-light p-1 font-mono lowercase dark:bg-dark">
      {name}
    </button>
  );
}
