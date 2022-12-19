export interface Book {
  editions: Edition[];
  olkey: string;
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
  subjects: Subject[];
  publisher: Publisher;
}

export interface Author {
  name: string;
}

export interface Subject {
  name: string;
}

export interface Publisher {
  name: string;
}