import maplibre from 'maplibre-gl';

export function showFeatureTablePopup(event, popup) {
    const feature = event.features[0];
    const properties = feature.properties;

    const formatBool = val => (val === true || String(val).toLowerCase() === 'true') ? 'Yes' : 'No';

    function formatDateTime(dateStr) {
        if (!dateStr) return '-';
        // Some date strings might need parsing depending on format, Date constructor handles ISO nicely
        const date = new Date(dateStr);
        if (isNaN(date)) return dateStr;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = String(date.getDate()).padStart(2, '0');
        const m = months[date.getMonth()];
        const y = date.getFullYear();
        const hs = String(date.getHours()).padStart(2, '0');
        const ms = String(date.getMinutes()).padStart(2, '0');
        return `${d} ${m} ${y} &ndash; ${hs}:${ms}`;
    }

    const val = (v) => (v !== null && v !== undefined) ? v : '-';

    // Build grouped rows explicitly as requested
    const rows = `
        <tr><th>Case Number</th><td>${val(properties.case_number)}</td></tr>
        <tr><th>Crime Type</th><td>${val(properties.crime_type)}</td></tr>
        <tr><th>Crime Description</th><td>${val(properties.crime_description)}</td></tr>
        <tr><th>Address</th><td>${val(properties.address)}</td></tr>
        <tr><th>Location</th><td>${val(properties.location_description)}</td></tr>
        
        <tr class="divider"><td colspan="2"></td></tr>
        
        <tr><th>IUCR Code</th><td>${val(properties.iucr_code)}</td></tr>
        <tr><th>FBI Code</th><td>${val(properties.fbi_code)}</td></tr>
        
        <tr class="divider"><td colspan="2"></td></tr>
        
        <tr><th>District</th><td>${val(properties.district_name)}</td></tr>
        <tr><th>Beat</th><td>${val(properties.beat_code)}</td></tr>
        
        <tr class="divider"><td colspan="2"></td></tr>
        
        <tr><th>Occurred At</th><td>${formatDateTime(properties.occurred_at)}</td></tr>
        <tr><th>Arrest</th><td>${formatBool(properties.arrest)}</td></tr>
        <tr><th>Domestic</th><td>${formatBool(properties.domestic)}</td></tr>
        
        <tr class="divider"><td colspan="2"></td></tr>
        <tr class="section-header"><td colspan="2">Geolocation</td></tr>
        
        <tr><th>Latitude</th><td>${val(properties.latitude)}</td></tr>
        <tr><th>Longitude</th><td>${val(properties.longitude)}</td></tr>
    `;

    const content = `
        <style>
            .feature-popup-container {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                min-width: 320px;
            }
            .feature-popup-title {
                margin: 0 0 12px 0;
                font-size: 15px;
                font-weight: 600;
                color: #1f2937;
                border-bottom: 2px solid #3b82f6;
                padding-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .feature-popup-table-wrapper {
                max-height: 350px;
                overflow-y: auto;
                border: 1px solid #d1d5db;
                border-radius: 6px;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
            }
            .feature-popup-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
                text-align: left;
            }
            .feature-popup-table th {
                padding: 8px 14px;
                background-color: #f9fafb;
                border-bottom: 1px solid #e5e7eb;
                border-right: 1px solid #e5e7eb;
                font-weight: 600;
                color: #4b5563;
                width: 40%;
                vertical-align: top;
            }
            .feature-popup-table td {
                padding: 8px 14px;
                border-bottom: 1px solid #e5e7eb;
                color: #374151;
            }
            .feature-popup-table tr.divider td {
                padding: 0;
                height: 4px;
                background-color: #e5e7eb;
                border: none;
            }
            .feature-popup-table tr.section-header td {
                padding: 10px 14px 6px 14px;
                background-color: #f3f4f6;
                font-weight: 700;
                color: #1f2937;
                border-bottom: 1px solid #d1d5db;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 0.5px;
            }
            .feature-popup-table tr:last-child th,
            .feature-popup-table tr:last-child td {
                border-bottom: none;
            }
            .feature-popup-table tr:hover td:not([colspan]), 
            .feature-popup-table tr:hover th {
                background-color: #f3f4f6;
            }
        </style>
        <div class="feature-popup-container">
            <h4 class="feature-popup-title">CRIME INFORMATION</h4>
            <div class="feature-popup-table-wrapper">
                <table class="feature-popup-table">
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    return popup
        .setLngLat(event.lngLat)
        .setHTML(content)
        .setMaxWidth('450px');
}