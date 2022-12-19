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
    cover: data.imageLinks.thumbnail,
  };
};

const getOpenLibraryData = async (isbn: string) => {
  const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
  const data = await response.json();

  const workResponse = await fetch(`https://openlibrary.org${data.works[0].key}.json`);
  const workData = await workResponse.json();

  const subjects = workData.subjects ?? [];

  return {
    subjects,
    book: { olkey: workData.key, editions: [] },
  };
};

export default defineEventHandler(async (event): Promise<Edition> => {
  try {
    const [googleData, openlibraryData] = await Promise.all([
      await getGoogleData(event.context.params.isbn),
      await getOpenLibraryData(event.context.params.isbn),
    ]);

    return {
      ...googleData,
      ...openlibraryData,
      subjects: [...googleData.subjects, ...openlibraryData.subjects],
    } as Edition;
  }
  catch (err) {
    sendError(event, err);
  }
});
