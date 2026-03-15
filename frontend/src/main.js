import { createMap } from './map/createMap';
import { addHandlers } from './handlers/addHandlers';
import { addControl } from './controls/addControl';
import { addMapEvents } from './events/addMapEvents';
import './style.css';

const map = createMap();
addHandlers(map);
addControl(map);
addMapEvents(map);

// Add floating title banner inside the map container
const banner = document.createElement('div');
banner.id = 'map-banner';
banner.innerHTML = `
  <span class="banner-title">Chicago Crime Incidents</span>
`;
map.getContainer().appendChild(banner);