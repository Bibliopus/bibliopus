import type { Edition } from '~/types/book';

export const getOpenLibraryData = async (isbn: string): Promise<Partial<Edition>> => {
  try {
    const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    if (response.status === 200) {
      return {
        cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
      };
    }
    else {
      return {};
    }
  }
  catch (err) {
    return null;
  }
};
