import {
  Map,
  ScaleControl,
  NavigationControl,
  AttributionControl,
} from "@vis.gl/react-maplibre";
import ItemMarker from "./ItemMarker";

export default function TerraIgnotaMap({ data, theme }) {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full bg-white dark:bg-black">
      <Map
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
        {data?.map((item) => (
          <ItemMarker
            key={item._id}
            item={item}
            // setCurrentItem={setCurrentItem}
          />
        ))}
        <ScaleControl
          position="bottom-left"
          style={{
            borderWidth: "1px",
            borderColor: theme === "dark" ? "white" : "black",
            backgroundColor: "transparent",
            color: theme === "dark" ? "white" : "black",
          }}
        />
        <NavigationControl
          position="bottom-left"
          showCompass={false}
          style={{
            borderRadius: "0px",
            border: "1px solid black",
            boxShadow: "none",
            backgroundColor: "white",
          }}
        />

        <AttributionControl customAttribution="" compact={true} />
      </Map>
    </div>
  );
}
