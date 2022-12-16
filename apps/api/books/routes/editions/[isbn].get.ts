import type { Author, Edition, Publisher } from '~/types/book';

export default defineEventHandler(async (event) => {
  const response = await fetch(`https://openlibrary.org/books/${event.context.params.isbn}.json`);
  const json = await response.json();
  if (json.type.key === '/type/edition') {
    const authors: Author[] = await Promise.all(json.authors.map(async (author) => {
      const details = await (await fetch(`https://openlibrary.org/${author.key}.json`)).json();
      return {
        name: details.name,
        isni: details.remote_ids.isni ?? undefined,
        wikidata: details.remote_ids.wikidata ?? undefined,
      } as Author;
    }));
    const publishers: Publisher[] = json.publishers.map(publisher => ({
      name: publisher,
    }));

    return {
      title: json.title,
      authors,
      publishers,
    } as Edition;
  }
  return 'No book found';
});
