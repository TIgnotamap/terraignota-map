import Item from "./Item";
import Project from "./Project";

export default function PageSelector({ currentItem, setCurrentItem }) {
  return (
    <>
      {currentItem?._type == "item" && (
        <Item currentItem={currentItem} setCurrentItem={setCurrentItem} />
      )}
      {currentItem?._type == "project" && (
        <Project currentItem={currentItem} setCurrentItem={setCurrentItem} />
      )}
    </>
  );
}
