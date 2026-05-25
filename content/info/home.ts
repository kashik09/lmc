import type { InfoPage } from '../types';

export const home: InfoPage = {
  slug: 'home',
  title: 'Lifeline Medical Centre',
  lede: 'LMC is renowned for its range of clinical services.',
  sections: [
    {
      heading: 'Welcome to Lifeline',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thank you for allocating time to know more about us. We are certain you will find us of relevance to your healthcare needs. Lifeline Medical Centre is here to serve you and your family and it is our appeal that when you have any healthcare need, you will look up to us as your first option.',
        },
        {
          type: 'paragraph',
          text: 'Our mission is to provide quality health care services more accessible to the general public and we are physically located in Gayaza town 13.7 km from Kampala. We welcome you to know more about Lifeline Medical Centre and encourage you to freely contact us for any inquiries.',
        },
      ],
    },
    {
      heading: 'Quality Healthcare',
      blocks: [
        {
          type: 'paragraph',
          text: 'LMC is built on respect and powered by empathy to give back to the community. We value the fact that we were born and raised in a community and the initiative to establish the medical center is not only to give back to the community but to offer the best services including exceptional care to our community in Gayaza and the surrounding.',
        },
        {
          type: 'paragraph',
          text: 'LMC offers both inpatient and outpatient services.',
        },
      ],
    },
  ],
};
