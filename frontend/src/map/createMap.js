import maplibre from 'maplibre-gl';
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';

export function createMap() {
  const osmRasterStyle = {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© Evan Hoediansyah",
      },
    },
    layers: [{ id: "osm", type: "raster", source: "osm" }],
  };

  return new maplibregl.Map({
    container: "map",
    style: osmRasterStyle,
    center: [-87.6298, 41.8781], // Chicago
    zoom: 10,
    attributionControl: false
  });
}

// export function createMap() {
//     return new maplibre.Map({
//         container: 'map',
//         style: 'https://demotiles.maplibre.org/style.json',
//         center: [-87.6298, 41.8781],
//         zoom: 2,
//         //hash: true
//     });
// }