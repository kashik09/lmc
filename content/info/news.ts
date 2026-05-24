import type { InfoPage } from '../types';

export const news: InfoPage = {
  slug: 'news',
  title: 'News & Updates',
  lede: 'Latest news and updates from Lifeline Medical Centre.',
  sections: [
    {
      heading: 'Stay Informed',
      blocks: [
        {
          type: 'paragraph',
          text: 'Check back regularly for news about our services, health tips, and community events.',
        },
      ],
    },
  ],
};
