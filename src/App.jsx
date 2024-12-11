import { useState, useEffect, useContext } from "react";
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
import Header from "./components/Header";
import ItemTitle from "./components/ItemTitle";

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

  if (loading) return <div className="py-4 font-thin">Loading...</div>;
  if (error) return <div className="py-4 font-thin text-red-500">{error}</div>;
  if (
    currentItem === null &&
    (pathname !== "/" || pathname !== "/info" || pathname !== "/index")
  ) {
    setCurrentItem(
      data.items.filter((item) => item.slug.current === pathname.slice(1))[0],
    );
  }

  return (
    <div className="p-4 text-dark dark:text-light">
      <Header data={data?.settings} theme={theme} setTheme={setTheme} />
      <TerraIgnotaMap
        data={data}
        theme={theme}
        setCurrentItem={setCurrentItem}
        currentItem={currentItem}
        filteredItems={filteredItems}
      />
      {currentItem && (
        <ItemTitle currentItem={currentItem} setCurrentItem={setCurrentItem} />
      )}

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
      <TagList
        tags={data?.tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
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
    </div>
  );
}

export default App;
