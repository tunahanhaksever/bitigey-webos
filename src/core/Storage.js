const STORAGE_PREFIX = 'bitigey_webos_';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const val = localStorage.getItem(STORAGE_PREFIX + key);
      return val ? JSON.parse(val) : defaultValue;
    } catch(e) {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch(e) {}
  }
};
