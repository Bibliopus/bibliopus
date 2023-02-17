import type { Author, Edition, Subject } from '~/types/book';

const getGoogleData = async (isbn: string) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const json = await response.json();
  const linkToVolume = json.items[0].selfLink;
  const data = (await (await fetch(linkToVolume)).json()).volumeInfo;

  const authors: Author[] = data.authors.map(author => ({ name: author }));
  const subjects: Subject[] = data.categories?.map(category => ({ name: category })) ?? [];

  const getISBN = (type: string) => data.industryIdentifiers.find(
    indentifier => indentifier.type === type,
  ).identifier;

  return {
    isbn10: getISBN('ISBN_10'),
    isbn13: getISBN('ISBN_13'),
    title: data.title,
    description: data.description,
    authors,
    publisher: data.publisher,
    subjects,
    pageCount: data.pageCount,
    releaseDate: data.publishedDate,
    cover: data?.imageLinks?.thumbnail?.replace('&edge=curl', ''),
  };
};

const getOpenLibraryData = async (isbn: string) => {
  try {
    const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    const data = await response.json();

    const workResponse = await fetch(`https://openlibrary.org${data.works[0].key}.json`);
    const workData = await workResponse.json();

    const subjects = workData.subjects?.map(category => ({ name: category })) ?? [];

    return {
      subjects,
      book: { olkey: workData.key, editions: [] },
      cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
    };
  }
  catch (err) {
    return null;
  }
};

export default defineEventHandler(async (event): Promise<Edition> => {
  // Fix CORS Issues for now
  event.node.res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const [googleData, openlibraryData] = await Promise.all([
      await getGoogleData(event.context.params.isbn),
      await getOpenLibraryData(event.context.params.isbn),
    ]);

    let bookData = {} as Partial<Edition>;

    if (googleData) {
      bookData = {
        ...googleData,
      };
    }

    if (openlibraryData) {
      bookData = {
        ...bookData,
        ...openlibraryData,

      };
      if (googleData)
        bookData.subjects = [...googleData.subjects, ...openlibraryData.subjects];
    }

    return bookData as Edition;
  }
  catch (err) {
    sendError(event, err);
  }
});
