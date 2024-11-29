import { useState, useEffect } from "react";
import { Map, ScaleControl, NavigationControl } from "@vis.gl/react-maplibre";
import TagList from "../ui/TagList";
import ProjectList from "./ProjectList";
import ItemMarker from "./ItemMarker";

export default function TerraIgnotaMap({ data, theme, setCurrentItem }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredItems, setFilteredItems] = useState(data.items);

  useEffect(() => {
    if (selectedTags.length > 0) {
      const filtered = data.items?.filter((item) =>
        item.tags?.some((tag) => selectedTags.includes(tag._id)),
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(data.items);
    }
  }, [selectedTags, data.items]);

  return (
    <div>
      <TagList
        tags={data?.tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <ProjectList
        projects={data?.projects}
        items={data?.items}
        setCurrentItem={setCurrentItem}
        filteredItems={filteredItems}
      />
      <div className="fixed inset-0 -z-10 h-screen w-full bg-white dark:bg-black">
        <Map
          id="terraIgnotaMap"
          initialViewState={{
            longitude: -67,
            latitude: -57,
            zoom: 3.5,
            bearing: 90,
            minZoom: 3,
          }}
          mapStyle={
            theme === "dark"
              ? "/terraignota-map/styles/dark.json"
              : "/terraignota-map/styles/light.json"
          }
          cursor="crosshair"
          dragRotate={false}
          touchZoomRotate={false}
          attributionControl={false}
        >
          {filteredItems?.map((item) => (
            <ItemMarker
              key={item._id}
              item={item}
              setCurrentItem={setCurrentItem}
            />
          ))}
          <ScaleControl
            position="bottom-right"
            style={{
              borderWidth: "1px",
              borderColor: theme === "dark" ? "white" : "black",
              backgroundColor: "transparent",
              color: theme === "dark" ? "white" : "black",
            }}
          />
          {/* <NavigationControl
            position="bottom-left"
            showCompass={false}
            style={{
              borderRadius: "0px",
              border: "1px solid black",
              boxShadow: "none",
              backgroundColor: "white",
            }}
          /> */}
        </Map>
      </div>
    </div>
  );
}
