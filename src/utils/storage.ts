import { StorageEnum } from "@/types/enum";

/**
 * 
 * @param key 
 * @returns 
 */
export const getItem = <T>(key:StorageEnum):T | null => {
  let value = null;
  try {
    const result = localStorage.getItem(key);
    if (result) {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

/**
 * 
 * @param key 
 * @returns 
 */
export const getStringItem = (key:StorageEnum):string | null => {
  return localStorage.getItem(key);
};

/**
 * 
 * @param key 
 */
export const setItem = <T>(key:StorageEnum, value: T):void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 
 * @param key 
 */
export const removeItem = (key:StorageEnum):void => {
  localStorage.removeItem(key);
};

/**
 * 
 */
export const clearItems = () => {
  localStorage.clear();
}