import type { InfoPage } from '../types';

export const contacts: InfoPage = {
  slug: 'contacts',
  title: 'Contact Us',
  lede: 'Get in touch with Lifeline Medical Centre.',
  sections: [
    {
      heading: 'Location',
      blocks: [
        {
          type: 'paragraph',
          text: 'Gayaza-Zirobwe Road, Gayaza, Uganda',
        },
      ],
    },
    {
      heading: 'Phone',
      blocks: [
        {
          type: 'paragraph',
          text: 'Emergency Line: (+256) 774-202-747',
        },
      ],
    },
    {
      heading: 'Email',
      blocks: [
        {
          type: 'paragraph',
          text: 'info@lmc.co.ug',
        },
      ],
    },
  ],
};
