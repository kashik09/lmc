import type { ServicePage } from '../types';

export const antenatal: ServicePage = {
  slug: 'antenatal',
  title: 'Antenatal',
  lede: 'Our maternity and pediatric suite of services helps prepare and support mothers throughout the delivery process, while providing the highest level of care.',
  sections: [
    {
      heading: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          text: 'We provide comprehensive antenatal care services to support expectant mothers through every stage of pregnancy.',
        },
      ],
    },
    {
      heading: 'Conditions We Treat',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Urinary tract infections',
            'Adolescent gynaecological issues',
            'Cancer (including cervical cancer, uterine cancer and ovarian cancer)',
            'Cervical polyps and abnormalities',
            'Endometriosis',
            'Polycystic ovarian syndrome (PCOS)',
          ],
        },
      ],
    },
  ],
};
