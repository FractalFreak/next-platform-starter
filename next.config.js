module.exports = {
    experimental: {},

    // Für Audio-Dateien
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp3)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/sounds/[name][hash][ext]'
            }
        });

        config.externals = [...(config.externals || []), '@loadable/component'];
        config.resolve.alias = {
            ...config.resolve.alias,
            'gsap/ScrollTrigger': 'gsap/ScrollTrigger.js'
        };
        return config;
    }
};
