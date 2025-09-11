/**
 * Saves and load Map of data to and from the browser's SessionStorage under a specified key.
 */

import { SESSION_STORAGE_KEY } from "./constants";
import type { ICocktail } from "./mapRawCocktailData";

const cocktailCache = loadFromSessionStorage(SESSION_STORAGE_KEY);

export function saveToSessionStorage(
  key: string,
  data: Map<number, ICocktail>
): void {
  // convert Map to plain object first
  const obj = Object.fromEntries(data);

  sessionStorage.setItem(key, JSON.stringify(obj));
}

export function loadFromSessionStorage(key: string): Map<number, ICocktail> {
  const stored = sessionStorage.getItem(key);

  if (!stored) return new Map<number, ICocktail>();

  // parse the JSON object and convert to Map
  const obj = JSON.parse(stored) as Record<string, ICocktail>;

  return new Map<number, ICocktail>(
    Object.entries(obj).map(([key, value]) => [parseInt(key), value])
  );
}

export function setSessionCocktail(id: number, cocktail: ICocktail): void {
  cocktailCache.set(parseInt(cocktail.id), cocktail);
  saveToSessionStorage(SESSION_STORAGE_KEY, cocktailCache);
}

export function hasSessionCocktail(id: number): boolean {
  return cocktailCache.has(id);
}

export function getSessionCocktail(id: number): ICocktail {
  const temp = cocktailCache.get(id);
  console.log(temp);
  return cocktailCache.get(id)!;
}
