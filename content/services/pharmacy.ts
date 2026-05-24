import type { ServicePage } from '../types';

export const pharmacy: ServicePage = {
  slug: 'pharmacy',
  title: 'Pharmacy',
  lede: 'A full range of medicines in all forms is provided through strict scrutiny to ensure efficacious but affordable drugs.',
  sections: [
    {
      heading: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our pharmacy stocks a comprehensive range of medications and medical supplies. Our qualified pharmacists provide professional dispensing services and medication counselling to ensure patients understand their treatments.',
        },
      ],
    },
  ],
};
