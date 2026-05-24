import type { ServicePage } from '../types';

export const laboratory: ServicePage = {
  slug: 'laboratory',
  title: 'Laboratory',
  lede: 'Our laboratory provides comprehensive diagnostic testing services with modern equipment and experienced technicians.',
  sections: [
    {
      heading: 'Haematology',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Full haemogram / Cell blood count',
            'Blood grouping',
            'Hb estimation',
            'Coombs test',
            'Film comment',
            'Hb electrophoresis',
            'Sickling test',
            'Reticulocyte count',
            'Coagulation tests',
          ],
        },
      ],
    },
    {
      heading: 'Microbiology',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: ['Culturing', 'Staining techniques', 'Fluid analysis'],
        },
      ],
    },
    {
      heading: 'Immunology',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: ['HIV testing', 'Hypersensitivity reactions', 'Auto immunity'],
        },
      ],
    },
  ],
};
