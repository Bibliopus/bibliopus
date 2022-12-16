export interface Book {
  editions: Edition[];
}

export interface Edition {
  isbn: string;
  title: string;
  book: Book;
  authors: Author[];
  description: string;
  releaseDate: Date;
  pageCount: number;
  cover: string;
  genres: Genre[];
  publishers: Publisher[];
}

export interface Author {
  name: string;
  isni?: string;
  wikidata?: string;
}

export interface Genre {
  name: string;
}

export interface Publisher {
  name: string;
}