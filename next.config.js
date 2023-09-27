/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost"]
    },
    // redirects: async () => {
    //     return [
    //         {
    //             source: "/login",
    //             destination: "/",
    //             permanent: false
    //         }
    //     ]
    // }
}

module.exports = nextConfig
