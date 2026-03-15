export function naturalEarth(map) {
    const layers = {
        crime: 'Crime Incidents',
        beat: 'Police Beat',
        district: 'Police District'
    }

    map.addSource(layers.crime, {
        type: 'geojson',
        data: '/geoserver/crime/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=crime:crime_incident_joined&outputFormat=application%2Fjson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addSource(layers.beat, {
        type: 'raster',
        tiles: [
            '/geoserver/crime/wms?service=WMS&version=1.1.1&request=GetMap' +
            '&layers=crime:police_beat' +
            '&styles=' +
            '&format=image/png' +
            '&transparent=true' +
            '&srs=EPSG:3857' +
            '&bbox={bbox-epsg-3857}' +
            '&width=256&height=256'
        ],
        tileSize: 256
    });

    map.addSource(layers.district, {
        type: 'raster',
        tiles: [
            '/geoserver/crime/wms?service=WMS&version=1.1.1&request=GetMap' +
            '&layers=crime:police_district' +
            '&styles=' +
            '&format=image/png' +
            '&transparent=true' +
            '&srs=EPSG:3857' +
            '&bbox={bbox-epsg-3857}' +
            '&width=256&height=256'
        ],
        tileSize: 256
    });
    return layers;
}