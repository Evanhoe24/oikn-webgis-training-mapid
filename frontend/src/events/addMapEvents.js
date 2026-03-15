import maplibre from 'maplibre-gl';
import { addLayers } from "../sources/addLayers";
import { showFeatureTablePopup } from "../popup/addPopup";

export function addMapEvents(map) {
    map.on("load", function () {
        addLayers(map);
    });

    const popup = new maplibre.Popup()

    // Add pointer cursor when hovering over unclustered points
    map.on('mouseenter', 'crime-layer', function (event) {
        map.getCanvas().style.cursor = 'pointer';
        showFeatureTablePopup(event, popup).addTo(map);
    });

    map.on('mouseleave', 'crime-layer', function () {
        map.getCanvas().style.cursor = '';
    });

    // Inspect a cluster on click
    map.on('click', 'clusters', async (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        try {
            // 'Crime Incidents' matches the source id given in addSources.js
            const zoom = await map.getSource('Crime Incidents').getClusterExpansionZoom(clusterId);
            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
            });
        } catch (err) {
            console.error(err);
        }
    });

    // Add pointer cursor when hovering over clusters
    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
}