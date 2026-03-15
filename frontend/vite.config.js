export default {
    server: {
        proxy: {
            '/geoserver': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            }
        }
    }
}