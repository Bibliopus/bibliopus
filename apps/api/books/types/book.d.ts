export interface Book {
  editions: Edition[];
}

export interface Edition {
  isbn10: string;
  isbn13: string;
  title: string;
  book: Book;
  authors: Author[];
  description: string;
  releaseDate: Date;
  pageCount: number;
  cover: string;
  genres: Genre[];
  publisher: Publisher;
}

export interface Author {
  name: string;
}

export interface Genre {
  name: string;
}

export interface Publisher {
  name: string;
}