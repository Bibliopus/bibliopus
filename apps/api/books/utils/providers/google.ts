import type { Author, Edition } from '~/types/book';

export const getGoogleData = async (isbn: string): Promise<Partial<Edition>> => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
  const json = await response.json();
  const linkToVolume = json.items[0].selfLink;
  const data = (await (await fetch(linkToVolume)).json()).volumeInfo;

  const authors: Author[] = data?.authors?.map(author => ({ name: author }));
  // const subjects: Subject[] = data?.categories?.map(category => ({ name: category })) ?? [];

  return {
    title: data.title,
    description: data.description,
    authors,
    publisher: data.publisher,
    // subjects,
    pages: data.pageCount,
    release: data.publishedDate,
    cover: data?.imageLinks?.thumbnail?.replace('&edge=curl', ''),
  };
};
