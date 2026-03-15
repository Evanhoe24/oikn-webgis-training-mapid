export class CustomLogoControl {
    onAdd(map) {
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-logo';
        this._container.innerHTML = `
            <a href="https://www.ikn.go.id/">
                <img 
                    src="src/assets/Logo_Nusantara.png" 
                    alt="Logo IKN" 
                    style="
                        width: 70px; 
                        height: 100px;
                        padding:4px;
                        background: rgba(255,255,255,0.6);
                        border-radius:8px;
                        box-shadow:0 2px 8px rgba(0,0,0,0.3);
                        backdrop-filter: blur(3px);
                    "
                >`;
        return this._container;
    };

    onremove() {
        this._container.parentNode.removeChild(this._container);
        this._container = null;
    }
}