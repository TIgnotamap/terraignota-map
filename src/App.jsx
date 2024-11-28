import { useState, useEffect, useContext } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useTheme from "./hooks/useTheme";
import ProjectList from "./components/Map/ProjectList";
import Credits from "./components/Credits";
import Info from "./components/Info";
import ItemContainer from "./components/Map/Item/ItemContainer";

import TagList from "./components/ui/TagList";
import TerraIgnotaMap from "./components/Map/TerraIgnotaMap";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [theme, setTheme] = useTheme();

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

  if (loading) return <div className="py-4 font-thin">Loading...</div>;
  if (error) return <div className="py-4 font-thin text-red-500">{error}</div>;

  return (
    <BrowserRouter basename="/terraignota-map">
      <div className="p-4 text-dark dark:text-light">
        <Header data={data?.settings} theme={theme} setTheme={setTheme} />
        <TerraIgnotaMap
          data={data}
          theme={theme}
          setCurrentItem={setCurrentItem}
        />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/info" element={<Info data={data?.settings} />} />
          <Route path="/credits" element={<Credits people={data?.people} />} />
          <Route path="/:slug" element={<ItemContainer item={currentItem} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
