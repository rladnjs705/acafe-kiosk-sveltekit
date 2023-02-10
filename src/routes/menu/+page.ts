import type { PageLoad } from './$types';
import { getCategoryList } from './menu'; 

export const load = (() => {
  return getCategoryList();
})satisfies PageLoad;