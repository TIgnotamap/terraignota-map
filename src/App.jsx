import { useState, useEffect, useContext } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { LanguageContext } from "./utils/LanguageContext";
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./pages/Home/ProjectList";
import Credits from "./pages/Credits/Credits";
import Info from "./pages/Info/Info";
import ItemContainer from "./pages/Item/ItemContainer";

import TagList from "./components/ui/TagList";
import TerraIgnotaMap from "./pages/Home/TerraIgnotaMap";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const { language, setLanguage } = useContext(LanguageContext);

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

  console.log(data);

  return (
    <BrowserRouter basename="/terraignota-map">
      <div className="px-4">
        <header className="sticky top-0 flex items-center justify-between">
          <h1 className="py-4 text-xl font-thin">
            <NavLink to="/">
              {data?.settings?.title[language] || "Terra Ignota Map"}
            </NavLink>
          </h1>
          <nav className="flex gap-2">
            <NavLink to="/info" className="border px-2 py-1">
              Info
            </NavLink>
            <NavLink to="/credits" className="border px-2 py-1">
              Credits
            </NavLink>
            <button
              className="border px-2 py-1"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
            >
              {language === "es" ? "English" : "Español"}
            </button>
          </nav>
        </header>

        <TerraIgnotaMap />
        <TagList tags={data.tags} />
        <ProjectList
          projects={data?.projects}
          items={data?.items}
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
