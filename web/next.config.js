const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
])

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fish-n-chill.herokuapp.com/api/:path*',
      },
    ]
  },
})
