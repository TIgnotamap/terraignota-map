export default function ItemContainer({ item }) {
  if (item.template === "3") return null;
  return (
    <div className="fixed right-4 mt-2 h-[70vh] w-[400px] border">
      <div>{item.code}</div>
    </div>
  );
}
