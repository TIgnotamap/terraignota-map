import { useState, useEffect, useContext } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { LanguageContext } from "./utils/LanguageContext";
import { NavLink, BrowserRouter, Routes, Route } from "react-router-dom";

import useTheme from "./hooks/useTheme";
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

  console.log(data);

  return (
    <BrowserRouter basename="/terraignota-map">
      <div className="text-dark dark:text-light p-4">
        <header className="sticky top-0 flex items-center justify-between font-serif">
          <h1 className="border-gray bg-light dark:bg-dark dark:text-light border px-1 py-1 text-sm">
            <NavLink to="/">
              {data?.settings?.title[language] || "Terra Ignota Map"}
            </NavLink>
          </h1>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => {
                if (theme === "dark") {
                  setTheme("light");
                  document.documentElement.classList.toggle("dark");
                } else {
                  setTheme("dark");
                  document.documentElement.classList.toggle("dark");
                }
              }}
            >
              ●
            </button>
            <NavLink
              to="/info"
              className="bg-light dark:bg-dark dark:text-light border-darkGray size-6 rounded-full border p-1 text-center font-mono text-xs lowercase"
            >
              ?
            </NavLink>
            <NavLink
              to="/credits"
              className="bg-light dark:bg-dark dark:text-light border-darkGray rounded-full border px-2 py-1 font-mono text-xs lowercase"
            >
              Index
            </NavLink>
            <button
              className="bg-light dark:bg-dark dark:text-light border-darkGray size-6 rounded-full border p-1 pt-[2px] text-center font-mono text-xs lowercase"
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </nav>
        </header>

        <TerraIgnotaMap data={data?.items} theme={theme} />
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
