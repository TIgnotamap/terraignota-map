import RockItem from "./RockItem";
import OscItem from "./OscItem";
import PerspectiveItem from "./PerspectiveItem";
import DefaultItem from "./DefaultItem";

export default function ItemContainer({ item }) {
  const renderTemplate = () => {
    switch (item?.template) {
      case "1":
        return <RockItem item={item} />;
      case "2":
        return <OscItem item={item} />;
      case "3":
        return <PerspectiveItem item={item} />;
      default:
        return <DefaultItem item={item} />;
    }
  };

  return (
    <div
      className={`bg-light dark:bg-dark fixed right-4 mt-2 h-[70vh] w-[400px] overflow-y-scroll border p-1 font-mono text-xs ${item?.isHighlighted ? "border-red-600" : "border-gray"}`}
    >
      {renderTemplate()}
    </div>
  );
}
