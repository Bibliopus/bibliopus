import { validateIsbnStringList } from '~/utils/validate/isbn';

export default defineEventHandler(async () => {
  return {
    results: validateIsbnStringList('1794329897,9782221255728,0425027066,0450050882,0425027066,0450050882'),
  };
});
