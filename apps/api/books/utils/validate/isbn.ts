export const validateIsbn = (isbn: string): boolean => {
  // Validate isbn is a valid isbn
  if (!isbn)
    return false;
  return isbn.match(/^(\d{9}|\d{12}|\d{9}X|\d{12}X)$/g) !== null;
};

export const validateIsbnStringList = (list: string): boolean => {
  if (!list)
    return false;
  // Validate that the list is comma separated and each item is a valid ISBN
  return list.split(',').every(isbn => validateIsbn(isbn)) ?? false;
};
