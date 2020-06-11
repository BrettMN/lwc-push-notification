// Custom webpack configuration file, provides generation of service worker
// More information: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
            './src/index.html',
            './src/manifest.json',
            './src/resources'
        ]),
        new InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'sw.js'
        })
    ]
};
