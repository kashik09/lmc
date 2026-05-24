import type { ServicePage } from '../types';

export const radiology: ServicePage = {
  slug: 'radiology',
  title: 'Radiology',
  lede: 'Our professionals have vast experience in medical imaging and make deliberate effort to ensure Evidence-Based Practice and high quality services offered in a friendly, professional, interactive and informative manner. We use a modern high-end Ultrasound machine with superior resolution, Color, Power and Spectral Doppler Capabilities and a digitized x-ray machine with crystal clear digital images.',
  sections: [
    {
      heading: 'Ultrasound Services',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Abdominal ultrasound',
            'Pelvic ultrasound',
            'Obstetric ultrasound',
            'Advanced abdomino-pelvic ultrasound',
            'Colour Doppler ultrasound',
            'Fetal Doppler ultrasound',
            'Pre-eclampsia screening / Uterine artery Doppler ultrasound',
            'Vascular ultrasound',
            'Small parts (Thyroid, Breast, Scrotal, Salivary glands, Penile, Prostate, Eye/Orbits) ultrasound',
            'Musculoskeletal ultrasound scans',
          ],
        },
      ],
    },
    {
      heading: 'X-Ray Services',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Skull x-ray',
            'Spine x-ray',
            'Chest x-ray',
            'Abdominal x-ray',
            'Pelvic x-ray',
            'Upper and Lower limb x-ray',
          ],
        },
      ],
    },
    {
      heading: 'Special Procedures',
      blocks: [
        {
          type: 'list',
          ordered: false,
          items: [
            'Barium studies',
            'Hysterosalpingography (HSG)',
            'Intravenous Pyelography (IVP)',
          ],
        },
      ],
    },
  ],
};
