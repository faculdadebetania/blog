/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'fatebe-strapi-images.s3.us-east-1.amazonaws.com'
        }]
    }
};

export default nextConfig;
