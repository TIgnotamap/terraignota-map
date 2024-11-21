import RockItem from "./RockItem";
import OscItem from "./OscItem";
import PerspectiveItem from "./PerspectiveItem";
import DefaultItem from "./DefaultItem";

export default function ItemContainer({ item }) {
  const renderTemplate = () => {
    switch (item.template) {
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
      className={`m-4 ${item.isHighlighted ? "border-4 border-red-600" : "border"}`}
    >
      {renderTemplate()}
    </div>
  );
}
