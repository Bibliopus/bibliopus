export const validateIsbn = (isbn: string): boolean => {
  // Validate isbn is a valid isbn
  if (!isbn)
    return false;
  return isbn.match(/^(\d{10}|\d{13})$/g) !== null;
};

export const validateIsbnStringList = (list: string): boolean => {
  // Validate that the list is comma separated and each item is a valid isbn
  if (!list)
    return false;
  return list.match(/^(\d{10}|\d{13})(,\d{10}|\d{13})*$/g) !== null;
};
