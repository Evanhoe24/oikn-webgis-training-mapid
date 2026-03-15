# 🗺️ Chicago Crime Incidents — WebGIS

An interactive web-based GIS application for visualizing and exploring crime incident data in Chicago. Built with **MapLibre GL JS**, **GeoServer**, and **PostGIS**, powered by a **Vite** frontend.

---

## ✨ Features

- **Crime Incident Points** — Individual crime locations rendered as interactive map markers.
- **Point Clustering** — Automatic clustering of nearby crime points with a red-to-yellow gradient indicating cluster density.
- **Police District & Beat Boundaries** — WMS raster overlays from GeoServer showing jurisdiction areas.
- **Layer Management Panel** — Collapsible panel to toggle layers on/off.
- **Feature Popups** — Hover over a crime point to see detailed information (case number, crime type, address, IUCR/FBI codes, date, etc.) in a formatted table popup.

---

## 🛠️ Tech Stack

| Component      | Technology                              |
| -------------- | --------------------------------------- |
| **Frontend**   | Vite + Vanilla JavaScript               |
| **Map Engine** | MapLibre GL JS v5                       |
| **Base Map**   | OpenStreetMap raster tiles              |
| **GeoServer**  | GeoServer 2.28.0 (WMS / WFS)            |
| **Database**   | PostgreSQL 16 + PostGIS 3.4             |
| **Containers** | Docker Compose                          |

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────┐
│                  Browser (Frontend)                │
│  ┌──────────────┐  ┌────────────┐  ┌────────────┐  │
│  │  MapLibre GL │  │  Controls  │  │   Popups   │  │
│  │  (map view)  │  │  (layers)  │  │  (details) │  │
│  └──────┬───────┘  └─────┬──────┘  └─────┬──────┘  │
│         │                │               │         │
│         └────────────────┼───────────────┘         │
└──────────────────────────┼─────────────────────────┘
                           │ HTTP (WFS / WMS)
                           ▼
                  ┌─────────────────┐
                  │    GeoServer    │
                  │   (port 8081)   │
                  └────────┬────────┘
                           │ SQL
                           ▼
                  ┌─────────────────┐
                  │     PostGIS     │
                  │   (port 5433)   │
                  └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) (v18+ recommended)

### 1. Start Backend Services

```bash
# From the project root
docker compose up -d
```

This launches:
- **PostGIS** on port `5433` (database: `geodata`)
- **GeoServer** on port `8081`

### 2. Install Frontend Dependencies

```bash
# From the frontend folder
cd frontend
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

### ⚠️ Important Note — GeoServer PostGIS Credentials

When configuring the PostGIS data store in GeoServer, always ensure that the database credentials match the PostgreSQL database credentials.

By default, when cloning this repository, the GeoServer store configuration may still use the old username:

```bash
evan
```
However, the PostgreSQL container in this project uses:

```
username: admin
```

If the credentials do not match, GeoServer will fail to connect to the PostGIS database, and the layers will not be available.


**Correct Configuration Example**
| Parameter    | Value        |
| ------------ | ------------ |
| **Host**     | localhost    |
| **Port**     | 5432         |
| **Database** | geodata      |
| **Schema**   | crime        |
| **User**     | admin        |
| **Password** | admin        |

Make sure the GeoServer PostGIS store uses the same username and password as defined in the PostgreSQL container configuration.

---

## 📁 Project Structure

```
oikn-webgis-training-mapid/
├── data/                                # Geoserver configuration & data
├── data_postgis/                        # PostGIS data imports 
|   └── crimes.sql                       # Database initialization SQL scripts
└── frontend/                            # Vite web application
|   ├── index.html                       # Entry HTML (map container)
|   ├── package.json                     # Dependencies (maplibre-gl, vite)
|   ├── vite.config.js                   # Vite configuration
|   └── src/
|        ├── main.js                     # App entry point
|        ├── style.css                   # Global & component styles
|        ├── assets/                     # Static assets (logo, images)
|        ├── map/
|        │   └── createMap.js            # MapLibre map initialization
|        ├── sources/
|        │   ├── addSources.js           # GeoServer data sources (WFS/WMS)
|        │   └── addLayers.js            # Map layer definitions & styling
|        ├── controls/
|        │   ├── addControl.js           # Control registration
|        │   └── LayerManagerControl.js  # Toggle layers on/off
|        ├── events/
|        │   └── addMapEvents.js         # Mouse/click event handlers
|        ├── handlers/
|        │   └── addHandlers.js          # Map interaction handlers
|        └── popup/
|            └── addPopup.js             # Crime info popup template
├── docker-compose.yml                   # PostGIS + GeoServer containers
└── README.md
```

---

## 📊 Data Sources

| Layer                | Source Type   | GeoServer Layer               |
| -------------------- | ------------- | ----------------------------- |
| Crime Incidents      | WFS (GeoJSON) | `crime:crime_incident_joined` |
| Police Beat          | WMS (Raster)  | `crime:police_beat`           |
| Police District      | WMS (Raster)  | `crime:police_district`       |

Crime data sourced from the [Chicago Data Portal](https://data.cityofchicago.org/).

---

## 📄 License

This project is for educational and training purposes.

---

> Built by **Evan Hoediansyah** — OIKN WebGIS Training (Mapid)
