import type { ServicePage } from '../types';

export const outpatient: ServicePage = {
  slug: 'outpatient',
  title: 'Outpatient',
  lede: 'Walk-in and scheduled outpatient services for consultations, checkups, and specialized care.',
  sections: [
    {
      heading: 'Services Offered',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: ['Specialized Consultation', 'Medical checkups'],
        },
      ],
    },
  ],
};
