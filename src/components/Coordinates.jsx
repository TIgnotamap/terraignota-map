export default function Coordinates({ currentItem, mapCenter }) {
  return (
    <div className="flex gap-12 font-serif sm:gap-8">
      <div className="drop-shadow-[0_0_2px_#fff] sm:bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] dark:drop-shadow-[0_0_2px_#000] dark:sm:bg-[radial-gradient(#000_0%,_#00000000_80%)]">
        {currentItem?.lat || mapCenter.lat.toFixed(6)}
      </div>
      <div className="drop-shadow-[0_0_2px_#fff] sm:bg-[radial-gradient(#fff_0%,_#ffffff00_80%)] dark:drop-shadow-[0_0_2px_#000] dark:sm:bg-[radial-gradient(#000_0%,_#00000000_80%)]">
        {currentItem?.long || mapCenter.lng.toFixed(6)}
      </div>
    </div>
  );
}
