import type { InfoPage } from '../types';

export const visitors: InfoPage = {
  slug: 'visitors',
  title: 'Visitor Information',
  lede: 'Guidelines for visiting patients at Lifeline Medical Centre.',
  sections: [
    {
      heading: 'Visiting Hours',
      blocks: [
        {
          type: 'paragraph',
          text: 'Please observe visiting hours to ensure patients get adequate rest for recovery.',
        },
      ],
    },
    {
      heading: 'Ward Guidelines',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'The ward allows only 2 visitors at a time per patient.',
            'To reduce the risk of infection, children under the age of 16 years are not allowed in the wards.',
            'We encourage all visitors to apply hand gel/alcohol rub prior to and on leaving the ward. These are located at the entrance to the ward.',
          ],
        },
      ],
    },
    {
      heading: 'General Rules',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Smoking, use of illicit drugs and alcohol are not permitted in the Hospital premises.',
            'Filming and Photography are not permitted on the ward.',
            'The Hospital will not tolerate any form of verbal or physical abuse to staff or damage to hospital property.',
          ],
        },
      ],
    },
  ],
};
