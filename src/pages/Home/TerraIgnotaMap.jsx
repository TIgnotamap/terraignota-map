import { Map } from "@vis.gl/react-maplibre";

export default function TerraIgnotaMap() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full">
      <Map
        initialViewState={{
          longitude: -67,
          latitude: -57,
          zoom: 3,
          bearing: 90,
        }}
        mapStyle="/terraignota-map/styles/light.json"
      />
    </div>
  );
}
