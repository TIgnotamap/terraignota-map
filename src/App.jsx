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

      <div className="pointer-events-none fixed bottom-0 m-6 flex w-1/2 items-end gap-2">
        <div className="pointer-events-auto flex w-1/3 flex-col gap-2">
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
        </div>
        <div className="pointer-events-auto">
          <TagList
            tags={data?.tags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
      </div>
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
