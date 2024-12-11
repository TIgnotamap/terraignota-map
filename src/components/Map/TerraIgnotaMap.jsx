import { useState, useEffect } from "react";
import {
  useMap,
  Map,
  ScaleControl,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import ItemMarker from "./ItemMarker";
import ItemTitle from "../ItemTitle";
import Coordinates from "../Coordinates";

export default function TerraIgnotaMap({
  data,
  theme,
  setCurrentItem,
  currentItem,
  filteredItems,
}) {
  const { terraIgnotaMap } = useMap();
  const [mapCenter, setMapCenter] = useState({ lat: -67, lng: -57 });

  useEffect(() => {
    currentItem &&
      terraIgnotaMap?.flyTo({
        center: [currentItem.long, currentItem.lat],
        zoom: 8,
      });
  }, [currentItem, terraIgnotaMap]);

  return (
    <div>
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
          onMove={() => {
            setMapCenter(terraIgnotaMap?.getCenter());
          }}
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
              marginRight: "7.5rem",
              marginBottom: "1.5rem",
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

      <div className="pointer-events-none fixed top-4 flex w-full flex-col items-center font-serif">
        <Coordinates currentItem={currentItem} mapCenter={mapCenter} />
        {currentItem && (
          <ItemTitle
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        )}
      </div>
    </div>
  );
}
