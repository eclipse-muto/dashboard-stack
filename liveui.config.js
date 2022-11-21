module.exports = {
    hotReloadContext: 'src',
    devPort: 4006,
    microPort: 5006,
    exposes: {
        'dashboard-stack': './src/index.tsx'
    },
    shared: [
        'axios',
        'react',
        'react-dom',
        "react-router-dom",
        '@patternfly/react-core',
        "@patternfly/react-icons",
        '@tanstack/react-query',
        "html-loader",
        "style-loader",
        'uuid'
    ],
}
