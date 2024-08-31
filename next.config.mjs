/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/documents',
          has: [
            {
              type: 'cookie',
              key: 'next-auth.session-token',
            },
          ],
          permanent: false,
          destination: '/login',
        },
      ];
    },
  };
  
  export default nextConfig;
  
