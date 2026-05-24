import type { ServicePage } from '../types';

export const inpatient: ServicePage = {
  slug: 'inpatient',
  title: 'Inpatient',
  lede: 'Comprehensive inpatient care services with comfortable facilities and round-the-clock medical attention.',
  sections: [
    {
      heading: 'What We Provide',
      blocks: [
        {
          type: 'paragraph',
          text: 'Our inpatient facilities are designed to ensure patient comfort and optimal recovery. The following items are provided for all admitted patients:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Mattress',
            'Blanket',
            'Basin',
            'Toilet paper',
            'Mosquito Net',
            'Bed sheets',
          ],
        },
      ],
    },
    {
      heading: 'What to Bring',
      blocks: [
        {
          type: 'paragraph',
          text: 'Patients are advised to bring the following personal items:',
        },
        {
          type: 'list',
          ordered: false,
          items: [
            'Night wear',
            'Slippers',
            'Towel and face towel',
            'Toothbrush and paste',
            'Bathing soap and sponge',
          ],
        },
      ],
    },
  ],
};
