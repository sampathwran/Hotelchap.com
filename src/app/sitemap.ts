import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hotelchap.com';

  const routes = [
    '',
    '/hotel',
    '/flights',
    '/cars',
    '/transfers',
    '/attractions',
    '/offers',
    '/destinations',
    '/blog',
    '/help-center',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
