/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/telegram',
                destination: 'https://t.me/Predprenimatel1',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
