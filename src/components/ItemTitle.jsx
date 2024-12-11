import { useNavigate } from "react-router-dom";
import { useMap } from "@vis.gl/react-maplibre";

export default function ItemTitle({ currentItem, setCurrentItem }) {
  const { terraIgnotaMap } = useMap();
  const navigate = useNavigate();

  return (
    <>
      <div className="text-2xl">{currentItem.code}</div>
      <div
        onClick={() => {
          terraIgnotaMap?.flyTo({ center: [-67, -57], zoom: 3.5 });
          setCurrentItem(null);
          navigate("/");
        }}
        className="pointer-events-auto cursor-pointer select-none"
      >
        x
      </div>
    </>
  );
}
