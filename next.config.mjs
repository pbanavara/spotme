/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: 'https://spotme-xi.vercel.app' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, DELETE, PATCH, POST, PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                ],
            },
        ];
    },
    reactStrictMode: true,
    env: {
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_URL: process.env.POSTGRES_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
        POSGTRES_USER: process.env.POSGTRES_USER,
        SECRET: process.env.SECRET
    },
    images: {
        domains: [
            "d3dgc1hn06lo53.cloudfront.net",
            "s3.amazonaws.com",
            "afr.net",
            "ott.bgea.live",
            "deow9bq0xqvbj.cloudfront.net",
            "d3wo5wojvuv7l.cloudfront.net",
            "episodes.castos.com",
        ],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};
export default nextConfig;