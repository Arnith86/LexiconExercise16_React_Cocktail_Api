import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./localStorageContainer";

export function getFavorites<T>(key: string): T[] {
  return loadFromLocalStorage(key);
}

export function isFavorite<T>(key: string, id: T): boolean {
  return getFavorites(key).includes(id);
}

function addFavorite<T>(key: string, id: T): void {
  const storedFavorite = loadFromLocalStorage(key);
  saveToLocalStorage(key, [...storedFavorite, id]);
}

function removeFavorite<T>(key: string, id: T): void {
  const storedFavorite = loadFromLocalStorage(key);

  saveToLocalStorage(
    key,
    storedFavorite.filter((f) => f !== id)
  );
}

export function toggleFavorite<T>(key: string, id: T): void {
  if (isFavorite(key, id)) removeFavorite(key, id);
  else addFavorite(key, id);
}
