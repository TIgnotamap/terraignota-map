export default function Coordinates({ currentItem, mapCenter }) {
  return (
    <div className="flex gap-8">
      <div>{currentItem?.lat || mapCenter.lat}</div>
      <div>{currentItem?.long || mapCenter.lng}</div>
    </div>
  );
}
