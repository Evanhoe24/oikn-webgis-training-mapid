import { naturalEarth } from './addSources.js';

export function addLayers(map) {
    const layers = {
        crime: 'crime-layer',
        district: 'police-district-layer',
        beat: 'police-beat-layer'
    }

    const neSource = naturalEarth(map);

    map.addLayer({
        id: layers.beat,
        type: 'raster',
        source: neSource.beat,
        paint: {
            'raster-opacity': 0.8
        }
    })

    map.addLayer({
        id: layers.district,
        type: 'raster',
        source: neSource.district,
        paint: {
            'raster-opacity': 0.8
        }
    })

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: neSource.crime,
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#fee08b',
                100,
                '#fdae61',
                750,
                '#d73027'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ],
            'circle-opacity': 0.85
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: neSource.crime,
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Open Sans Regular'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: layers.crime,
        type: "circle",
        source: neSource.crime,
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-radius': 6,
            'circle-color': '#ef4444',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff'
        }
    });
    return layers;
}