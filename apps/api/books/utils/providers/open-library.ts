import type { Edition } from '~/types/book';

export const getOpenLibraryData = async (isbn: string): Promise<Partial<Edition>> => {
  try {
    let data: Partial<Edition> = {};
    // Query book from Open Library API using ISBN
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
    if (response.status === 200) {
      const json = await response.json();
      const book = json[`ISBN:${isbn}`];
      if (book) {
        data = {
          title: book.title,
          authors: book.authors?.map((author: any) => ({ name: author.name })),
          publisher: book.publishers?.[0]?.name,
          release: book.publish_date,
          pages: book.number_of_pages,
        };
      }
    }

    const detailResponse = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=details`);
    if (detailResponse.status === 200) {
      const json = await detailResponse.json();
      const workId = json[`ISBN:${isbn}`]?.details?.works?.[0].key;
      if (workId) {
        const workResponse = await fetch(`https://openlibrary.org${workId}.json`);
        if (workResponse.status === 200) {
          const json = await workResponse.json();
          const work = json;
          if (work)
            data.description = work.description.value;
        }
      }
    }

    const coverResponse = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`);
    if (coverResponse.status === 200)
      data.cover = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    return data;
  }
  catch (err) {
    return null;
  }
};
