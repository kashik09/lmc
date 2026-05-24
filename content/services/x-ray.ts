import type { ServicePage } from '../types';

export const xray: ServicePage = {
  slug: 'x-ray',
  title: 'X-Ray',
  lede: 'X-ray imaging is the fastest and easiest way for a physician to view and assess broken bones, cracked skulls and injured backbones.',
  sections: [
    {
      heading: 'Upper Extremity',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Hand',
            'Wrist',
            'Forearm',
            'Elbow',
            'Humerus',
            'Shoulder',
            'Clavicle',
            'Scapula',
          ],
        },
      ],
    },
    {
      heading: 'Lower Extremity',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Foot',
            'Ankle',
            'Knee',
            'Femur',
            'Hip',
            'Os Calcis',
            'Long Bones',
          ],
        },
      ],
    },
    {
      heading: 'Head & Spine',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: ['Skull', 'Orbits', 'Nasal Bones', 'Spine'],
        },
      ],
    },
    {
      heading: 'Specialized Studies',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: ['Bone Age', 'DEXA Bone Density Study'],
        },
      ],
    },
  ],
};
