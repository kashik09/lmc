import type { ServicePage } from '../types';

export const dental: ServicePage = {
  slug: 'dental',
  title: 'Dental',
  lede: 'Comprehensive dental care services for the whole family, from routine checkups to specialized treatments.',
  sections: [
    {
      heading: 'Services Offered',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Cementing / fillings',
            'Tooth extractions and other surgeries',
            'Root canal treatment',
            'Scaling & polishing',
            'Orthodontics / aligning teeth',
            'Crowning & bridging',
          ],
        },
      ],
    },
  ],
};
