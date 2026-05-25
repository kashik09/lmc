import type { ServicePage } from '../types';

export const dental: ServicePage = {
  slug: 'dental',
  title: 'Dental',
  lede: 'At LMC, we provide comprehensive and fine dental services to our dear clients. Our team is comprised of highly skilled dental specialists who are committed in their practice.',
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
