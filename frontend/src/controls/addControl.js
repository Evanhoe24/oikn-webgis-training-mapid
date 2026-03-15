import maplibre from 'maplibre-gl';
import { CustomLogoControl } from './customLogoControls';
import { LayerManagerControl } from './LayerManagerControl';

export function addControl(map) {
    map.addControl(new maplibre.NavigationControl(), 'top-right');
    map.addControl(
        new maplibre.ScaleControl({
            maxWidth: 250
        }),
    );
    map.addControl(
        new maplibre.FullscreenControl(),
        'top-right'
    );
    map.addControl(
        new maplibre.GlobeControl(),
        'top-right'
    );
    map.addControl(
        new maplibre.LogoControl({
            //compact: true,
        }),
        'bottom-right'
    );
    map.addControl(
        new CustomLogoControl(),
        'top-left'
    );
    map.addControl(
        new LayerManagerControl(),
        'bottom-left'
    );
    map.addControl(
        new maplibre.AttributionControl({
            customAttribution: '<a href="https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-Present/ijzp-q8t2/about_data" target="_blank" style="color: #0078A8;">Source: Chicago Data Portal</a>',
            compact: true
        }),
        'bottom-right'
    );
    // map.addControl(
    //     new handlerToggleControls()
    // );
}