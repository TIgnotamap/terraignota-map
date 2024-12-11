export default function Coordinates({ currentItem }) {
  return (
    <div className="flex gap-8">
      <div>{currentItem?.lat || "-"}</div>
      <div>{currentItem?.long || "-"}</div>
    </div>
  );
}
