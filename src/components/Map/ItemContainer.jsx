import RockItem from "./Item/RockItem";
import OscItem from "./Item/OscItem";
import PerspectiveItem from "./Item/PerspectiveItem";
import DefaultItem from "./Item/DefaultItem";

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
      className={`fixed right-4 mt-2 h-[70vh] w-[400px] overflow-y-scroll border bg-light p-1 font-mono text-xs dark:bg-dark ${item?.isHighlighted ? "border-red-600" : "border-gray"}`}
    >
      {renderTemplate()}
    </div>
  );
}
