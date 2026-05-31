import type { InsurancePartnersPage } from '../types';

export const insurancePartners: InsurancePartnersPage = {
  slug: 'insurance',
  title: 'Insurance Partners',
  lede: 'We work with leading insurance providers to ensure you receive the care you need. Lifeline Medical Centre accepts a variety of insurance plans to make quality healthcare accessible.',
  sections: [
    {
      heading: 'Accepted Insurance',
      blocks: [
        {
          type: 'paragraph',
          text: 'Please contact us to confirm coverage for your specific plan before your visit.',
        },
      ],
    },
  ],
  partners: [
    {
      name: 'Jubilee Insurance',
      logo: {
        src: '/images/partners/jubilee.png',
        alt: 'Jubilee Insurance logo',
      },
    },
    {
      name: 'Prudential',
      logo: {
        src: '/images/partners/prudential.png',
        alt: 'Prudential Insurance logo',
      },
    },
    {
      name: 'APA Insurance',
      logo: {
        src: '/images/partners/apa.png',
        alt: 'APA Insurance logo',
      },
    },
    {
      name: 'Liberty',
      logo: {
        src: '/images/partners/liberty.png',
        alt: 'Liberty Insurance logo',
      },
    },
    {
      name: 'Britam',
      logo: {
        src: '/images/partners/britam.png',
        alt: 'Britam Insurance logo',
      },
    },
  ],
};
