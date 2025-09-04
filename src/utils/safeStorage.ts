/**
 * Safe Storage Utility
 * 
 * A utility that provides safe access to localStorage and sessionStorage
 * by wrapping all operations in try-catch blocks to handle environments
 * where storage access is restricted (like sandboxed iframes or browser previews).
 */

// In-memory fallback storage when localStorage/sessionStorage is not available
const memoryStorage: Record<string, Record<string, string>> = {
  local: {},
  session: {}
};

/**
 * Safely access localStorage with fallback to in-memory storage
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Unable to access localStorage, using in-memory fallback:', error);
      return memoryStorage.local[key] || null;
    }
  },
  
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Unable to access localStorage, using in-memory fallback:', error);
      memoryStorage.local[key] = value;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Unable to access localStorage, using in-memory fallback:', error);
      delete memoryStorage.local[key];
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Unable to access localStorage, using in-memory fallback:', error);
      memoryStorage.local = {};
    }
  }
};

/**
 * Safely access sessionStorage with fallback to in-memory storage
 */
export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.warn('Unable to access sessionStorage, using in-memory fallback:', error);
      return memoryStorage.session[key] || null;
    }
  },
  
  setItem: (key: string, value: string): void => {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.warn('Unable to access sessionStorage, using in-memory fallback:', error);
      memoryStorage.session[key] = value;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn('Unable to access sessionStorage, using in-memory fallback:', error);
      delete memoryStorage.session[key];
    }
  },
  
  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn('Unable to access sessionStorage, using in-memory fallback:', error);
      memoryStorage.session = {};
    }
  }
};
