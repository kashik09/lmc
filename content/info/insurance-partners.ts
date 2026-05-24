import type { InsurancePartnersPage } from '../types';

export const insurancePartners: InsurancePartnersPage = {
  slug: 'insurance',
  title: 'Insurance Partners',
  lede: 'We work with leading insurance providers to ensure you receive the care you need.',
  sections: [
    {
      heading: 'Accepted Insurance',
      blocks: [
        {
          type: 'paragraph',
          text: 'Lifeline Medical Centre accepts a variety of insurance plans. Please contact us to confirm coverage for your specific plan.',
        },
      ],
    },
  ],
  partners: [
    {
      name: 'Jubilee Insurance',
      logo: {
        src: '/images/partners/jubilee.png',
        alt: 'Jubilee Insurance',
      },
    },
  ],
};
