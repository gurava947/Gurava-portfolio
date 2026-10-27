export const COLLECTION_ORDER = ["python", "responsive", "static"];

export function getOrderedCollections(collections = []) {
  return COLLECTION_ORDER
    .map((id) => collections.find((collection) => collection.id === id))
    .filter(Boolean);
}
