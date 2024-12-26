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
  data,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 flex h-full w-1/2 shrink-0 flex-col justify-between px-6 pb-6 pt-4">
      <div
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="pointer-events-auto size-6 shrink-0 cursor-pointer rounded-full border border-gray bg-light pt-1 text-center text-xs shadow-md dark:bg-dark"
      >
        {isNavOpen ? "X" : "-"}
      </div>

      {isNavOpen && (
        <>
          <div className="ml-3 h-full w-[1px] border border-gray" />
          <div className="flex h-2/3 flex-col gap-2">
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
            />
          </div>
        </>
      )}
    </div>
  );
}
