export default function ItemTitle({ currentItem }) {
  return (
    <>
      <div className="text-2xl">{currentItem.code}</div>
    </>
  );
}
