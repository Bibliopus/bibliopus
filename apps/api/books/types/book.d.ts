// export interface Book {
//   editions: Edition[];
//   olkey: string;
// }

export interface Edition {
  isbn: string;
  title: string;
  // book: Book;
  description: string;
  authors: Author[] | number[];
  publisher: string;
  pages: number;
  release: number;
  cover: string;
  // subjects: Subject[];
}

export interface Author {
  name: string;
}

export interface Subject {
  name: string;
}

// export interface Publisher {
//   name: string;
// }