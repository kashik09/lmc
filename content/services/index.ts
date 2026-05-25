import type { ServicePage } from '../types';
import { theatre } from './theatre';
import { laboratory } from './laboratory';
import { dental } from './dental';
import { xray } from './x-ray';
import { radiology } from './radiology';
import { antenatal } from './antenatal';
import { inpatient } from './inpatient';
import { outpatient } from './outpatient';
import { generalMedicine } from './general-medicine';
import { immunisation } from './immunisation';
import { ambulance } from './ambulance';
import { pharmacy } from './pharmacy';

export {
  theatre,
  laboratory,
  dental,
  xray,
  radiology,
  antenatal,
  inpatient,
  outpatient,
  generalMedicine,
  immunisation,
  ambulance,
  pharmacy,
};

export const services: Record<string, ServicePage> = {
  theatre,
  laboratory,
  dental,
  'x-ray': xray,
  radiology,
  antenatal,
  inpatient,
  outpatient,
  'general-medicine': generalMedicine,
  immunisation,
  ambulance,
  pharmacy,
};

export const serviceSlugs = Object.keys(services);

/**
 * Backward-compatible list shape for components that consume the old format.
 * Maps ServicePage to { id, slug, title, shortDescription, image }.
 */
export const servicesList = Object.values(services).map((s) => ({
  id: s.slug,
  slug: s.slug,
  title: s.title,
  shortDescription: s.lede ?? 'Quality healthcare services.',
  image: s.heroImage?.src ?? '/images/services/placeholder.svg',
}));
