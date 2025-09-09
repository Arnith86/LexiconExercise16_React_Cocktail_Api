import { useState } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../helper/localStorageContainer";

type UseToggleFavoriteReturn<T> = {
  favorites: T[];
  getFavorites(): T[];
  isFavorite(id: T): boolean;
  toggleFavorite(id: T): void;
};

interface IItem {
  id: string;
}

export function useFavoriteManipulation<T extends IItem>(
  key: string
): UseToggleFavoriteReturn<T> {
  const [favorites, setFavorites] = useState<T[]>(loadFromLocalStorage(key));

  function getFavorites(): T[] {
    return loadFromLocalStorage(key);
  }

  function isFavorite(item: T): boolean {
    return getFavorites().some((f) => f.id === item.id);
  }

  function addFavorite(item: T): void {
    const storedFavorites: T[] = loadFromLocalStorage(key);
    const updatedFavorites: T[] = [...storedFavorites, item];
    saveFavorite(updatedFavorites);
  }

  function removeFavorite(item: T): void {
    const storedFavorites: T[] = loadFromLocalStorage(key);
    const updatedFavorites: T[] = storedFavorites.filter(
      (f) => f.id !== item.id
    );
    saveFavorite(updatedFavorites);
  }

  function saveFavorite(favorites: T[]) {
    saveToLocalStorage(key, favorites);
    setFavorites(favorites);
  }

  function toggleFavorite(item: T): void {
    if (isFavorite(item)) removeFavorite(item);
    else addFavorite(item);
  }

  return { favorites, getFavorites, isFavorite, toggleFavorite };
}
