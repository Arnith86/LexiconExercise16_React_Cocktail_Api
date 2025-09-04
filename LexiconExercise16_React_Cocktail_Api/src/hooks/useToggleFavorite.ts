import { useState } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../helper/localStorageContainer";

type UseToggleFavoriteReturn<T> = {
  favorites: T[];
  actions: {
    getFavorites(): T[];
    isFavorite(id: T): boolean;
    toggleFavorite(id: T): void;
  };
};

export function useToggleFavorite<T>(key: string): UseToggleFavoriteReturn<T> {
  const [favorites, setFavorites] = useState<T[]>(loadFromLocalStorage(key));

  function getFavorites(): T[] {
    return loadFromLocalStorage(key);
  }

  function isFavorite(id: T): boolean {
    return getFavorites().includes(id);
  }

  function addFavorite(id: T): void {
    const storedFavorites: T[] = loadFromLocalStorage(key);
    const updatedFavorites: T[] = [...storedFavorites, id];
    saveFavorite(updatedFavorites);
  }

  function removeFavorite(id: T): void {
    const storedFavorites: T[] = loadFromLocalStorage(key);
    const updatedFavorites: T[] = storedFavorites.filter((f) => f !== id);
    saveFavorite(updatedFavorites);
  }

  function saveFavorite(favorites: T[]) {
    saveToLocalStorage(key, favorites);
    setFavorites(favorites);
  }

  function toggleFavorite(id: T): void {
    if (isFavorite(id)) removeFavorite(id);
    else addFavorite(id);
  }

  return { favorites, actions: { getFavorites, isFavorite, toggleFavorite } };
}
