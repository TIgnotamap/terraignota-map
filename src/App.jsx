import { useState, useEffect } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { Routes, Route, useLocation } from "react-router-dom";

import useTheme from "./hooks/useTheme";
import Index from "./components/Index";
import Info from "./components/Info";
import ItemInfo from "./components/ItemInfo";

import TerraIgnotaMap from "./components/Map/TerraIgnotaMap";
import Menu from "./components/Menu";
import Ornaments from "./components/Ornaments";
import VideoContainer from "./components/VideoContainer";
import ImageSlideshow from "./components/ImageSlideshow";
import Nav from "./components/Nav";

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

  const [enter, setEnter] = useState(false);
  const [bgAudioIsPlaying, setBgAudioIsPlaying] = useState(false);

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

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const fetchedData = await fetchData();
  //       setData(fetchedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadData();
  // }, []);

  // useEffect(() => {
  //   const filteredItems = data?.items?.filter((item) => {
  //     const matchesTags = selectedTags.length
  //       ? item.tags?.some((tag) => selectedTags.includes(tag._id))
  //       : true;

  //     const matchesProjects = selectedProjects.length
  //       ? selectedProjects.some(
  //           (selectedProject) => item.project?._id === selectedProject,
  //         )
  //       : true;

  //     return matchesTags && matchesProjects;
  //   });

  //   setFilteredItems(filteredItems);
  // }, [selectedTags, selectedProjects, data]);

  // useEffect(() => {
  //   if (pathname === "/" || pathname === "/info" || pathname === "/index") {
  //     setCurrentItem(null);
  //   } else {
  //     const matchedItem = data?.items?.find(
  //       (item) => item.slug.current === pathname.slice(1),
  //     );
  //     setCurrentItem(matchedItem || null);
  //   }
  // }, [pathname, data]);

  const resizeImage = () => {
    setIsZoomed(!isZoomed);
  };

  // if (loading) return <div className="py-4 font-thin">Loading...</div>;
  // if (error) return <div className="py-4 font-thin text-red-500">{error}</div>;

  return (
    <div className="text-dark dark:text-light">
      {/* {!enter && (
        <div className="fixed z-[100] flex h-screen w-full items-center justify-center bg-white dark:bg-black">
          <button
            onClick={() => {
              setEnter(true);
              toggleBgAudio();
            }}
            className="underline"
          >
            start
          </button>
        </div>
      )}

      <Menu
        data={data?.settings}
        theme={theme}
        setTheme={setTheme}
        toggleBgAudio={toggleBgAudio}
        bgAudioIsPlaying={bgAudioIsPlaying}
      />

      {data?.settings?.audios?.length > 0 &&
        data.settings.audios.map((audio) => (
          <audio key={audio.url} src={audio.url} loop preload="auto" />
        ))}

      <TerraIgnotaMap
        data={data}
        theme={theme}
        setCurrentItem={setCurrentItem}
        currentItem={currentItem}
        filteredItems={filteredItems}
      />

      <Ornaments currentItem={currentItem} />

      <Nav
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        filteredItems={filteredItems}
        setCurrentItem={setCurrentItem}
        data={data}
      />

      {currentItem?.template === "1" && currentItem?.images?.length > 0 && (
        <div
          className={`fixed ${isZoomed ? "left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-light dark:bg-dark" : "left-[50%] top-36 w-2/6 -translate-x-1/2 drop-shadow-lg"}`}
        >
          <ImageSlideshow images={currentItem.images} isZoomed={isZoomed} />
          <div
            className="absolute right-3 top-3 flex size-4 cursor-pointer items-center justify-center rounded-sm border bg-white hover:size-5"
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
          <div className="fixed left-[50%] top-36 w-2/6 -translate-x-1/2 px-6 drop-shadow-lg">
            <VideoContainer item={currentItem} />
          </div>
        </>
      )}
      {currentItem?.template === "3" && (
        <div className="fixed right-0 top-36 w-[calc(100%-224px)] px-6">
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
      </footer> */}

      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className={`size-8 animate-spin rounded-full transition-opacity duration-500 dark:invert`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='black' stroke-width='1' stroke-dasharray='16%2c 2%2c 16' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
          }}
        />
      </div>
      <footer className="fixed bottom-0 mb-6 w-full text-center font-serif text-sm">
        Terra Ignota Map
      </footer>
    </div>
  );
}

export default App;
