import type { ServicePage } from '../types';

export const outpatient: ServicePage = {
  slug: 'outpatient',
  title: 'Outpatient',
  lede: 'This is managed by our general doctors and nurses.',
  sections: [
    {
      heading: 'Services Offered',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Specialized Consultation',
            'Medical checkups',
            'General Medical Consultations',
          ],
        },
      ],
    },
  ],
};
