import { useState, useEffect, useCallback } from "react";
import {
  useMap,
  Map,
  ScaleControl,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import ItemMarker from "./ItemMarker";
import ItemTitle from "../ItemTitle";
import Coordinates from "../Coordinates";
import { throttle } from "lodash";

export default function TerraIgnotaMap({
  data,
  theme,
  setCurrentItem,
  currentItem,
  filteredItems,
}) {
  const { terraIgnotaMap } = useMap();
  const [mapCenter, setMapCenter] = useState({
    lat: -56.89128362,
    lng: -66.9918726,
  });

  useEffect(() => {
    currentItem &&
      terraIgnotaMap?.flyTo({
        center: [currentItem.long + 0.5, currentItem.lat],
        zoom: 8,
      });
  }, [currentItem, terraIgnotaMap]);

  const updateCenter = useCallback(
    throttle(() => {
      if (terraIgnotaMap) {
        const center = terraIgnotaMap.getCenter();
        setMapCenter(center);
      }
    }, 250),
    [terraIgnotaMap],
  );

  const handleMove = () => {
    updateCenter();
  };

  return (
    <div>
      <div className="fixed inset-0 -z-10 h-screen w-full bg-light dark:bg-dark">
        <Map
          id="terraIgnotaMap"
          initialViewState={{
            latitude: -56.89128362,
            longitude: -66.9918726,
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
          onMove={handleMove}
        >
          {filteredItems?.map((item) => (
            <ItemMarker
              key={item._id}
              item={item}
              setCurrentItem={setCurrentItem}
              currentItem={currentItem}
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
