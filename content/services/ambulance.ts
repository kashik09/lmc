import type { ServicePage } from '../types';

export const ambulance: ServicePage = {
  slug: 'ambulance',
  title: 'Ambulance',
  lede: 'Critical care ambulance fully fitted with equipment to provide the right environment to safely transport critically ill patients to and from a hospital, Intensive Care Unit or accident scene.',
  sections: [
    {
      heading: 'Services',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Hospital to home transfers',
            'Hospital to hospital transfers',
            'Emergency response',
            'Accident scene transport',
          ],
        },
      ],
    },
  ],
};
