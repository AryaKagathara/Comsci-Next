/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [

      {
        source: '/projects/eatcoast_restaurant_management_food_delivery_platform',
        destination: '/projects/eatcoast-food-delivery',
        permanent: true,
      },
      {
        source: '/projects/medical_escape_milan_skin_care_clinic',
        destination: '/projects/medical-escape-milan',
        permanent: true,
      },
      {
        source: '/projects/nuai_artificial_intelligence_enabled_health_app',
        destination: '/projects/nuai-artificial-intelligence-health-app',
        permanent: true,
      },
      {
        source: '/projects/w3dart_bug_reporting_saas_tool',
        destination: '/projects/w3dart-bug-reporting-saas',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/service/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/service/approach',
        destination: '/approach',
        permanent: true,
      },
      {
        source: '/service/terms-conditions',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/project/terms-conditions',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/project/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/project/approach',
        destination: '/approach',
        permanent: true,
      },
      {
        source: '/service/seo',
        destination: '/services/search-engine-optimization',
        permanent: true,
      },
      {
        source: '/service/video-art-direction',
        destination: '/services/video-art-direction',
        permanent: true,
      },
      {
        source: '/service',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/project',
        destination: '/projects/',
        permanent: true,
      },
      {
        source: '/project/medical-escape',
        destination: '/projects/medical-escape-milan',
        permanent: true,
      },
      {
        source: '/blog/nihil-ipsa-veritatis-occaecati-facere-4',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/blog/comsci-establishes-own-3d-department-with-new-services-in-3d-design-ar-vr-and-web3-metaverse-2-7',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/blog/nihil-ipsa-veritatis-occaecati-facere-2',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/blog/nihil-ipsa-veritatis-occaecati-facere',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/project/blog',
        destination: '/blogs/',
        permanent: true,
      },
      {
        source: '/services/custom-web-development',
        destination: '/services/',
        permanent: true,
      },

    ];
  },

};

module.exports = nextConfig;