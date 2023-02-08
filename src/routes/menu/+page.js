import { getCategoryList } from './menu'; 

/** @type {import('./$types').PageLoad} */
export const load = (() => {
  return getCategoryList();
});