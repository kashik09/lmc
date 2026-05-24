import type { ServicePage } from '../types';

export const immunisation: ServicePage = {
  slug: 'immunisation',
  title: 'Immunisation',
  lede: 'Protect not only the children but also the adults against infectious diseases that can cause illness or death. Immunisation at no cost.',
  sections: [
    {
      heading: 'Benefits of Immunisation',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            "It strengthens a child's ability to fight diseases.",
            'It reduces the chances of children suffering from childhood immunisable diseases.',
            'It protects children from liver disease and cancer of the cervix in girls, in later years of their life.',
            'It prevents complications such as lameness and blindness in children.',
            'It reduces the burden/costs on parents/caregivers and communities in terms of time and money spent on treatment. This contributes to socio-economic development.',
            "It contributes to a child's proper growth and development.",
            'It protects the entire community from childhood vaccine preventable diseases.',
            'It protects the mother and her unborn baby from Tetanus.',
            'Once a child is immunized, he/she is protected against vaccine preventable diseases for his/her entire life.',
            'Makes children healthy and strong to serve and fulfil their God given purpose.',
          ],
        },
      ],
    },
  ],
};
