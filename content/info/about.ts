import type { InfoPage } from '../types';

export const about: InfoPage = {
  slug: 'about',
  title: 'About Lifeline Medical Centre',
  lede: 'LMC is renowned for its range of clinical services, from Antenatal Care clinics to Surgical Specialities.',
  sections: [
    {
      heading: 'Our Mission',
      blocks: [
        {
          type: 'paragraph',
          text: 'To provide exceptional healthcare services with compassion and excellence to the Gayaza community and surrounding regions.',
        },
      ],
    },
    {
      heading: 'Our Services',
      blocks: [
        {
          type: 'paragraph',
          text: 'Lifeline Medical Centre offers a comprehensive range of medical services including primary care, diagnostics, surgical procedures, and specialized treatments. We are committed to making quality healthcare accessible and affordable.',
        },
      ],
    },
  ],
};
