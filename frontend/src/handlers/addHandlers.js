import maplibre from 'maplibre-gl';

export function addHandlers(map) {
    // map.boxZoom.disable();
    console.log("Box Zoom", map.boxZoom.isEnabled());
    // map.keyboard.disable();
    console.log("Keyboard Handler", map.keyboard.isEnabled());
    // map.scrollZoom.disable();
    console.log("Scroll Zoom", map.scrollZoom.isEnabled());

    console.log("Touch Zoom Rotate", map.touchZoomRotate.isEnabled());

    map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        console.log(`Clicked at: ${lng}, ${lat}`);
    });
}