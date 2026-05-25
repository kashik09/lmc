import type { ServicePage } from '../types';

export const pharmacy: ServicePage = {
  slug: 'pharmacy',
  title: 'Pharmacy',
  lede: 'The Pharmacy Department is responsible for the dispensing of drugs and advice on their use, procurement, supply, storage and conforming to the standards of pharmacy practice by Pharmaceutical Society of Uganda.',
  sections: [
    {
      heading: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: 'A full range of medicines in all forms is provided through strict scrutiny to ensure efficacious but affordable drugs.',
        },
      ],
    },
  ],
};
