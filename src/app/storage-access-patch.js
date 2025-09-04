// Storage Access Patch
// This script patches localStorage and sessionStorage to prevent errors in sandboxed environments

(function() {
  if (typeof window !== 'undefined') {
    // Create memory fallbacks
    const memoryStorage = {
      local: {},
      session: {}
    };

    // Function to create a storage proxy
    function createStorageProxy(type, realStorage) {
      return new Proxy(realStorage, {
        get: function(target, prop) {
          if (prop === 'getItem') {
            return function(key) {
              try {
                return target.getItem(key);
              } catch (e) {
                console.warn(`[Storage Patch] Error accessing ${type}.getItem: ${e.message}`);
                return memoryStorage[type][key] || null;
              }
            };
          }
          if (prop === 'setItem') {
            return function(key, value) {
              try {
                return target.setItem(key, value);
              } catch (e) {
                console.warn(`[Storage Patch] Error accessing ${type}.setItem: ${e.message}`);
                memoryStorage[type][key] = value;
              }
            };
          }
          if (prop === 'removeItem') {
            return function(key) {
              try {
                return target.removeItem(key);
              } catch (e) {
                console.warn(`[Storage Patch] Error accessing ${type}.removeItem: ${e.message}`);
                delete memoryStorage[type][key];
              }
            };
          }
          if (prop === 'clear') {
            return function() {
              try {
                return target.clear();
              } catch (e) {
                console.warn(`[Storage Patch] Error accessing ${type}.clear: ${e.message}`);
                memoryStorage[type] = {};
              }
            };
          }
          if (prop === 'key') {
            return function(index) {
              try {
                return target.key(index);
              } catch (e) {
                console.warn(`[Storage Patch] Error accessing ${type}.key: ${e.message}`);
                return Object.keys(memoryStorage[type])[index] || null;
              }
            };
          }
          if (prop === 'length') {
            try {
              return target.length;
            } catch (e) {
              console.warn(`[Storage Patch] Error accessing ${type}.length: ${e.message}`);
              return Object.keys(memoryStorage[type]).length;
            }
          }
          
          // Default behavior for other properties
          try {
            return target[prop];
          } catch (e) {
            console.warn(`[Storage Patch] Error accessing ${type}.${String(prop)}: ${e.message}`);
            return undefined;
          }
        }
      });
    }

    // Apply patches
    try {
      // Test if we can access localStorage
      window.localStorage.getItem('test');
    } catch (e) {
      console.info('[Storage Patch] Patching localStorage due to access restrictions');
      Object.defineProperty(window, 'localStorage', {
        value: createStorageProxy('local', window.localStorage)
      });
    }

    try {
      // Test if we can access sessionStorage
      window.sessionStorage.getItem('test');
    } catch (e) {
      console.info('[Storage Patch] Patching sessionStorage due to access restrictions');
      Object.defineProperty(window, 'sessionStorage', {
        value: createStorageProxy('session', window.sessionStorage)
      });
    }

    console.info('[Storage Patch] Storage access patch initialized');
  }
})();
