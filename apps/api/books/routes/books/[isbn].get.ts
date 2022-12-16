export default defineEventHandler(async (event) => {
  const response = await fetch(`https://openlibrary.org/books/${event.context.params.isbn}.json`);
  const json = await response.json();
  return json;
});
