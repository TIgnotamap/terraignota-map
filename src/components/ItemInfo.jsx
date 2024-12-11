export default function ItemInfo({ item }) {
  if (!item) return <div>Loading...</div>;
  if (item.template === "3") return null;
  return (
    <div className="fixed right-6 top-16 h-[60vh] w-2/6 border bg-light dark:bg-dark">
      <div>{item.code}</div>
    </div>
  );
}
