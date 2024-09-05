/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //async redirects() {
    //return [
      //{
        //source: '/documents',
        //has: [
         // {
           // type: 'cookie',
           // key: 'next-auth.session-token',
           // value: '', // Redirigir si la cookie no está presente
          //},
       // ],
       // permanent: false,
       // destination: '/login',
       // statusCode: 302, // Add statusCode property
     // },
    //];
 // },
};

export default nextConfig;