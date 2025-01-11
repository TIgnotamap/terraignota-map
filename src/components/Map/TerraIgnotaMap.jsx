import { useState, useEffect, useCallback } from "react";
import { throttle } from "lodash";
import {
  useMap,
  Map,
  ScaleControl,
  NavigationControl,
} from "@vis.gl/react-maplibre";
import useIsMobile from "../../hooks/useIsMobile";
import ItemMarker from "./ItemMarker";
import Coordinates from "../Coordinates";
import { useLocation } from "react-router-dom";

export default function TerraIgnotaMap({
  data,
  theme,
  setCurrentItem,
  currentItem,
  filteredItems,
  hoveredItem,
  setHoveredItem,
}) {
  const { terraIgnotaMap } = useMap();
  const [mapCenter, setMapCenter] = useState({
    lat: -56.89128362,
    lng: -66.9918726,
  });
  const isMobile = useIsMobile();
  const location = useLocation();

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
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
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

      {((isMobile && location.pathname == "/") || !isMobile) && (
        <div className="pointer-events-none fixed z-10 flex h-screen w-full flex-col items-center justify-center px-6 text-xs sm:top-4 sm:h-auto sm:text-base">
          <Coordinates currentItem={currentItem} mapCenter={mapCenter} />
        </div>
      )}
    </div>
  );
}
