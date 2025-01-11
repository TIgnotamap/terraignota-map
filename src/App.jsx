import { useState, useEffect, useContext } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { Routes, Route, useLocation } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import { StatusBarContext } from "./utils/StatusBarContext";

import Menu from "./components/Menu";
import TerraIgnotaMap from "./components/Map/TerraIgnotaMap";
import Ornaments from "./components/Ornaments";
import Nav from "./components/Nav";
import Info from "./components/Info";
import Index from "./components/Index";
import Item from "./components/Item";
import Loading from "./components/ui/Loading";
import StatusBar from "./components/ui/StatusBar";
import ErrorPage from "./components/ErrorPage"; // Add this import

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);

  const [enter, setEnter] = useState(false);
  const [bgAudioIsPlaying, setBgAudioIsPlaying] = useState(false);

  const { setStatus } = useContext(StatusBarContext);

  const toggleBgAudio = () => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      if (!bgAudioIsPlaying) {
        audio.volume = Math.random();
        audio.play();
      } else {
        audio.pause();
      }
    });
    setBgAudioIsPlaying(!bgAudioIsPlaying);
  };

  useEffect(() => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      if (currentItem?.template === "2" || currentItem?.template === "3")
        audio.volume = 0;
      else if (currentItem === null) audio.volume = Math.random();
    });
  }, [currentItem]);

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
    const filteredItems = [
      ...(data?.items || []),
      ...(data?.exhibitions || []),
    ].filter((item) => {
      const matchesTags = selectedTags.length
        ? selectedTags.every((tag) =>
            item.tags?.some((itemTag) => itemTag._id === tag),
          )
        : true;

      const matchesProjects = selectedProjects.length
        ? selectedProjects.some(
            (selectedProject) =>
              item.project?._id === selectedProject ||
              (selectedProject === "exhibitions" &&
                item._type === "exhibition"),
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

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />; // Use ErrorPage component

  return (
    <div className="text-dark dark:text-light">
      {!enter && (
        <div className="fixed z-[100] flex h-screen w-full items-center justify-center bg-white dark:bg-black">
          <button
            onClick={() => {
              setEnter(true);
              toggleBgAudio();
              setStatus(null);
            }}
            className="underline"
          >
            {data?.settings.title.en}
          </button>
        </div>
      )}
      <StatusBar data={data} filteredItems={filteredItems} />
      <Menu
        data={data?.settings}
        theme={theme}
        setTheme={setTheme}
        toggleBgAudio={toggleBgAudio}
        bgAudioIsPlaying={bgAudioIsPlaying}
      />

      {data?.settings?.audios?.length > 0 &&
        data.settings.audios.map((url) => (
          <audio key={url} src={url} loop preload="auto" />
        ))}

      <TerraIgnotaMap
        data={data}
        theme={theme}
        setCurrentItem={setCurrentItem}
        currentItem={currentItem}
        filteredItems={filteredItems}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />

      <Ornaments currentItem={currentItem} />

      <Nav
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        filteredItems={filteredItems}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        setHoveredItem={setHoveredItem}
        data={data}
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
              data={data}
              setCurrentItem={setCurrentItem}
            />
          }
        />
        <Route
          path="/:slug"
          element={
            <Item currentItem={currentItem} setCurrentItem={setCurrentItem} />
          }
        />
        <Route path="*" element={<ErrorPage message="Page not found" />} />{" "}
      </Routes>

      <footer className="fixed bottom-0 right-0 m-6 font-serif text-sm">
        Terra Ignota Map
      </footer>
    </div>
  );
}

export default App;
