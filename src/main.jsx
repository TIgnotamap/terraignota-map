import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "maplibre-gl/dist/maplibre-gl.css";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./utils/LanguageContext.jsx";
import { MapProvider } from "@vis.gl/react-maplibre";
import { BrowserRouter } from "react-router-dom";
import { StatusBarProvider } from "./utils/StatusBarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <LanguageProvider>
        <StatusBarProvider>
          <MapProvider>
            <App />
          </MapProvider>
        </StatusBarProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
