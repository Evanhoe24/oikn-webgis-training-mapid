export class LayerManagerControl {
    constructor(options = {}) {
        this.options = options;
        this.layers = [
            { id: 'crime-layer', name: 'Crime Points', isCluster: false },
            { id: 'clusters', name: 'Crime Clusters', isCluster: true }, // 'cluster-count' should be toggled together
            { id: 'police-district-layer', name: 'Police District', isCluster: false },
            { id: 'police-beat-layer', name: 'Police Beat', isCluster: false }
        ];
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl layer-manager-container'; // Removed default group styling

        // The hidden panel
        const panel = document.createElement('div');
        panel.className = 'layer-manager-panel';
        panel.style.display = 'none'; // Hidden initially

        const title = document.createElement('div');
        title.className = 'layer-manager-title';
        title.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 8px;">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            Layer Management
        `;
        panel.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'layer-manager-list';

        this.layers.forEach(layer => {
            const listItem = document.createElement('li');

            const switchLabel = document.createElement('label');
            switchLabel.className = 'layer-switch';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `toggle-${layer.id}`;
            checkbox.checked = true; // Assume visible by default

            checkbox.addEventListener('change', (e) => {
                const visibility = e.target.checked ? 'visible' : 'none';
                this._map.setLayoutProperty(layer.id, 'visibility', visibility);

                // Also toggle cluster counts if this is the cluster layer
                if (layer.isCluster) {
                    this._map.setLayoutProperty('cluster-count', 'visibility', visibility);
                }
            });

            const slider = document.createElement('span');
            slider.className = 'layer-slider';

            switchLabel.appendChild(checkbox);
            switchLabel.appendChild(slider);

            const textLabel = document.createElement('label');
            textLabel.htmlFor = `toggle-${layer.id}`;
            textLabel.textContent = layer.name;
            textLabel.className = 'layer-label';

            listItem.appendChild(switchLabel);
            listItem.appendChild(textLabel);
            list.appendChild(listItem);
        });

        panel.appendChild(list);

        // The toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'layer-manager-toggle';
        toggleBtn.title = 'Toggle Layer Management';
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
        `;

        toggleBtn.addEventListener('click', () => {
            if (panel.style.display === 'none') {
                panel.style.display = 'block';
                toggleBtn.classList.add('active');
            } else {
                panel.style.display = 'none';
                toggleBtn.classList.remove('active');
            }
        });

        // Append panel first so it appears above the button if flex column-reverse is used (or just relying on normal DOM order with margin)
        this._container.appendChild(panel);
        this._container.appendChild(toggleBtn);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}
