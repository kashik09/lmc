import type { InfoPage, InsurancePartnersPage } from '../types';
import { about } from './about';
import { visitors } from './visitors';
import { contacts } from './contacts';
import { home } from './home';
import { news } from './news';
import { insurancePartners } from './insurance-partners';

export { about, visitors, contacts, home, news, insurancePartners };

export const infoPages: Record<string, InfoPage | InsurancePartnersPage> = {
  about,
  visitors,
  contacts,
  home,
  news,
  insurance: insurancePartners,
};

export const infoSlugs = Object.keys(infoPages);
