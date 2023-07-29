/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir:true,
        swcPlugins:[
            ["next-superjson-plugin",{}]
        ]
    },
    images: {
        domains: [
            "res.cloundinary.com",
            "lh3.googleusercontent.com",
            "avatars.githubusercontent.com"
        ]
    }
}

module.exports = nextConfig
