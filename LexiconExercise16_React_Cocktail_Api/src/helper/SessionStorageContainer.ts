/**
 * Utilities for saving and loading cocktail data to and from the browser's SessionStorage.
 * Uses a Map<number, ICocktail> internally for fast access by cocktail ID.
 */

import { SESSION_STORAGE_KEY } from "./constants";
import type { ICocktail } from "./mapRawCocktailData";

const cocktailCache = loadFromSessionStorage(SESSION_STORAGE_KEY);

/**
 * Saves a Map of cocktails to session storage under the specified key.
 *
 * @param key - Storage key
 * @param data - Map of cocktails to save
 */
export function saveToSessionStorage(
  key: string,
  data: Map<number, ICocktail>
): void {
  // convert Map to plain object first
  const obj = Object.fromEntries(data);

  sessionStorage.setItem(key, JSON.stringify(obj));
}

/**
 * Loads a Map of cocktails from session storage for the given key.
 *
 * @param key - Storage key
 * @returns Map of cocktails (empty if nothing stored)
 */
export function loadFromSessionStorage(key: string): Map<number, ICocktail> {
  const stored = sessionStorage.getItem(key);

  if (!stored) return new Map<number, ICocktail>();

  // parse the JSON object and convert to Map
  const obj = JSON.parse(stored) as Record<string, ICocktail>;

  return new Map<number, ICocktail>(
    Object.entries(obj).map(([key, value]) => [parseInt(key), value])
  );
}

/**
 * Adds or updates a cocktail in the session storage cache.
 *
 * @param id - Cocktail ID
 * @param cocktail - Cocktail data to store
 */
export function setSessionCocktail(id: number, cocktail: ICocktail): void {
  cocktailCache.set(parseInt(cocktail.id), cocktail);
  saveToSessionStorage(SESSION_STORAGE_KEY, cocktailCache);
}

/**
 * Checks whether a cocktail exists in the session storage cache.
 *
 * @param id - Cocktail ID
 * @returns True if the cocktail exists, false otherwise
 */
export function hasSessionCocktail(id: number): boolean {
  return cocktailCache.has(id);
}

/**
 * Retrieves a cocktail from the session storage cache.
 *
 * @param id - Cocktail ID
 * @returns The cocktail object (throws if not found)
 */
export function getSessionCocktail(id: number): ICocktail {
  return cocktailCache.get(id)!;
}
