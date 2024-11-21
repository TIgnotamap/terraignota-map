import { useState, useEffect, useContext } from "react";
import { fetchData } from "./sanity/sanity-utils";
import { LanguageContext } from "./utils/LanguageContext";
import ProjectList from "./components/ProjectList";
import ReferenceList from "./components/ReferenceList";
import DefaultItem from "./components/templates/DefaultItem";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <div className="p-4">
      <h1 className="py-4 font-thin">
        {data?.settings?.title[language] || "Terra Ignota Map"}
      </h1>
      <button
        className="fixed right-4 top-4 border border-blue-500 px-2 py-1"
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
      >
        {language === "es" ? "English" : "Español"}
      </button>

      <ProjectList projects={data?.projects} items={data?.items} />
      <hr className="my-4" />
      <h1 className="py-4 font-bold">Items:</h1>
      {data?.items.map((item) => (
        <DefaultItem key={item._id} item={item} />
      ))}

      <h1 className="py-4 font-bold">References:</h1>
      <ReferenceList data={data} />
    </div>
  );
}

export default App;
