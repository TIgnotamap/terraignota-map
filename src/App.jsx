import { useState, useEffect } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { Routes, Route, useLocation } from "react-router-dom";

import useTheme from "./hooks/useTheme";
import ProjectList from "./components/ProjectList";
import ItemList from "./components/ItemList";
import TagList from "./components/TagList";
import Index from "./components/Index";
import Info from "./components/Info";
import ItemInfo from "./components/ItemInfo";

import TerraIgnotaMap from "./components/Map/TerraIgnotaMap";
import Menu from "./components/Menu";
import Ornaments from "./components/Ornaments";
import VideoContainer from "./components/VideoContainer";
import ImageSlideshow from "./components/ImageSlideshow";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);

  const [isZoomed, setIsZoomed] = useState(false);

  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const filteredItems = data?.items?.filter((item) => {
      const matchesTags = selectedTags.length
        ? item.tags?.some((tag) => selectedTags.includes(tag._id))
        : true;

      const matchesProjects = selectedProjects.length
        ? selectedProjects.some(
            (selectedProject) => item.project?._id === selectedProject,
          )
        : true;

      return matchesTags && matchesProjects;
    });

    setFilteredItems(filteredItems);
  }, [selectedTags, selectedProjects, data]);

  useEffect(() => {
    if (pathname === "/" || pathname === "/info" || pathname === "/index") {
      setCurrentItem(null);
    } else {
      const matchedItem = data?.items?.find(
        (item) => item.slug.current === pathname.slice(1),
      );
      setCurrentItem(matchedItem || null);
    }
  }, [pathname, data]);

  const resizeImage = () => {
    setIsZoomed(!isZoomed);
  };

  if (loading) return <div className="py-4 font-thin">Loading...</div>;
  if (error) return <div className="py-4 font-thin text-red-500">{error}</div>;

  return (
    <div className="text-dark dark:text-light">
      <Menu data={data?.settings} theme={theme} setTheme={setTheme} />

      <TerraIgnotaMap
        data={data}
        theme={theme}
        setCurrentItem={setCurrentItem}
        currentItem={currentItem}
        filteredItems={filteredItems}
      />

      <Ornaments />

      <div className="pointer-events-none fixed bottom-0 m-6 flex w-2/3 items-end gap-2">
        <div className="pointer-events-auto flex w-[220px] shrink-0 flex-col gap-2">
          {isProjectsOpen && (
            <>
              <ItemList
                data={data && data}
                filteredItems={filteredItems}
                setCurrentItem={setCurrentItem}
              />
              <ProjectList
                projects={data?.projects}
                selectedProjects={selectedProjects}
                setSelectedProjects={setSelectedProjects}
                selectedTags={selectedTags}
                items={data?.items}
              />
            </>
          )}

          <div
            onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            className="pointer-events-auto w-[220px] shrink-0 cursor-pointer border border-gray bg-light p-1 text-center text-xs shadow-md dark:bg-dark"
          >
            {isProjectsOpen ? "x" : "-"}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          {isTagsOpen && (
            <div className="pointer-events-auto flex flex-col gap-2">
              <TagList
                tags={data?.tags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
          )}
          <div
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="pointer-events-auto w-full cursor-pointer border border-gray bg-light p-1 text-center text-xs shadow-md dark:bg-dark"
          >
            {isTagsOpen ? "x" : "-"}
          </div>
        </div>
      </div>

      {currentItem?.template === "1" && currentItem?.images?.length > 0 && (
        <div
          className={`fixed ${isZoomed ? "left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-light dark:bg-dark" : "left-[20%] top-[20%] w-2/6"}`}
        >
          <ImageSlideshow images={currentItem.images} isZoomed={isZoomed} />
          <div
            className="absolute right-2 top-2 flex size-4 cursor-pointer items-center justify-center border bg-white hover:size-5"
            onClick={() => resizeImage()}
          >
            {isZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.75rem"
                viewBox="0 -960 960 960"
                width="0.75rem"
                fill="undefined"
              >
                <path d="M296.92-160v-136.92H160v-40h176.92V-160h-40Zm326.93 0v-176.92h176.92v40H663.85V-160h-40ZM160-623.08v-40h136.92V-800h40v176.92H160Zm463.85 0V-800h40v136.92h136.92v40H623.85Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="0.75rem"
                viewBox="0 -960 960 960"
                width="0.75rem"
                fill="undefined"
              >
                <path d="M160-160v-176.92h40V-200h136.92v40H160Zm463.85 0v-40h136.92v-136.92h40V-160H623.85ZM160-623.08V-800h176.92v40H200v136.92h-40Zm600.77 0V-760H623.85v-40h176.92v176.92h-40Z" />
              </svg>
            )}
          </div>
        </div>
      )}
      {currentItem?.template === "2" && (
        <>
          <div className="fixed left-[20%] top-[20%] w-2/6 px-6">
            <VideoContainer item={currentItem} />
          </div>
        </>
      )}
      {currentItem?.template === "3" && (
        <div className="fixed right-0 top-[20%] w-5/6 px-6">
          <VideoContainer item={currentItem} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/info" element={<Info data={data?.settings} />} />
        <Route
          path="/index"
          element={
            <Index
              people={data?.people}
              orgs={data?.organizations}
              refMaterials={data?.references}
            />
          }
        />
        <Route path="/:slug" element={<ItemInfo item={currentItem} />} />
      </Routes>
      <footer className="fixed bottom-0 right-0 m-6 font-serif text-sm">
        Terra Ignota Map
      </footer>
    </div>
  );
}

export default App;
