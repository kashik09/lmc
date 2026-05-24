import type { ServicePage } from '../types';

export const theatre: ServicePage = {
  slug: 'theatre',
  title: 'Theatre',
  lede: 'We understand that surgery is not just about scalpels and retractors and as such take it as a must to comprehensively manage our patients by incorporating the social and physiological care with a human touch atop the clinical and surgical treatment they receive.',
  sections: [
    {
      heading: 'Services Offered',
      blocks: [
        { type: 'heading', level: 3, text: 'Minor Operations' },
        {
          type: 'list',
          ordered: false,
          items: [
            'Circumcision',
            'Minor excisions',
            'Dilatation and curettage (D&C) & MVA',
          ],
        },
        { type: 'heading', level: 3, text: 'Major Operations' },
        {
          type: 'list',
          ordered: false,
          items: [
            'Herniorrhaphy',
            'Major excisions',
            'Fissure in Ano',
            'Appendicectomy',
            'Haemorrhoidectomy',
            'Fistula in Ano',
            'Hydrocelectomy',
            'Orchidectomy',
            'Laparotomy for ovarian cyst',
            'Laparotomy for ectopic pregnancy',
            'Bilateral Tubal Ligation',
            'Cervical cerclage',
            'Hydrotubation for blocked tubes',
            'Myomectomy',
            'Cesarean Section (C/S)',
            "Bartholin's cyst marsupialisation",
          ],
        },
      ],
    },
  ],
};
