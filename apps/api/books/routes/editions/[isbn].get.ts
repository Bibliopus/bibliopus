import type { Author, Edition, Genre } from '~/types/book';

export default defineEventHandler(async (event) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${event.context.params.isbn}`);
  const json = await response.json();
  const linkToVolume = json.items[0].selfLink;
  const data = (await (await fetch(linkToVolume)).json()).volumeInfo;

  const authors: Author[] = data.authors.map(author => ({ name: author }));
  const genres: Genre[] = data.categories?.map(category => ({ name: category })) ?? [];

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
    genres,
    pageCount: data.pageCount,
    releaseDate: data.publishedDate,
  } as Edition;
});
