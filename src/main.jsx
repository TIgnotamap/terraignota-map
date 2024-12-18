import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "maplibre-gl/dist/maplibre-gl.css";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./utils/LanguageContext.jsx";
import { MapProvider } from "@vis.gl/react-maplibre";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/terraignota-map">
      <LanguageProvider>
        <MapProvider>
          <App />
        </MapProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
