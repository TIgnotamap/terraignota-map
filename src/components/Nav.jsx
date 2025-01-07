import { useState } from "react";
import ProjectList from "./ProjectList";
import ItemList from "./ItemList";
import TagList from "./TagList";

export default function Nav({
  selectedProjects,
  setSelectedProjects,
  selectedTags,
  setSelectedTags,
  filteredItems,
  setCurrentItem,
  currentItem,
  data,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 flex h-full w-1/2 flex-col justify-end px-6 pb-6 pt-4 transition-all">
      <div
        onClick={() => setIsNavOpen(!isNavOpen)}
        className={`pointer-events-auto flex size-8 shrink-0 cursor-pointer items-center justify-center ${isNavOpen ? "bg-light dark:bg-dark" : "bg-dark dark:bg-light"} border border-gray p-2 text-center text-xs shadow-md hover:invert`}
      />
      {isNavOpen && (
        <>
          <div className="ml-3 h-full w-[1px] border border-gray" />
          <div className="flex h-2/3 shrink-0 flex-col gap-2">
            <ProjectList
              projects={data?.projects}
              selectedProjects={selectedProjects}
              setSelectedProjects={setSelectedProjects}
              selectedTags={selectedTags}
              items={data?.items}
            />
            <ItemList
              filteredItems={filteredItems}
              setCurrentItem={setCurrentItem}
            />
            <TagList
              tags={data?.tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              items={data?.items}
              currentItem={currentItem}
            />
          </div>
        </>
      )}
    </div>
  );
}
