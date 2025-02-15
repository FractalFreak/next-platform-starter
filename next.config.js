module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/continental',
                permanent: true
            }
        ];
    }
};
