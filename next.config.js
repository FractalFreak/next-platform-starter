module.exports = {
    transpilePackages: ['gsap'],
    serverExternalPackages: ['canvas'], // Nur Server-seitige Pakete
    webpack: (config) => {
        config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx']
        };
        return config;
    }
};
