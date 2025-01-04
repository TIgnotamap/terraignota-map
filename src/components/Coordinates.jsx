export default function Coordinates({ currentItem, mapCenter }) {
  return (
    <div className="flex gap-8 font-serif">
      <div className="bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] drop-shadow-[0_0_2px_#fff] dark:bg-[radial-gradient(#000_0%,_#00000000_80%)] dark:drop-shadow-[0_0_2px_#000]">
        {currentItem?.lat || mapCenter.lat}
      </div>
      <div className="bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] drop-shadow-[0_0_2px_#fff] dark:bg-[radial-gradient(#000_0%,_#00000000_80%)] dark:drop-shadow-[0_0_2px_#000]">
        {currentItem?.long || mapCenter.lng}
      </div>
    </div>
  );
}
