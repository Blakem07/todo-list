class LocalStorageManager {
  static setItem(key, value) {
    // Save an item to localStorage
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  static getItem(key) {
    // Get an item from localStorage
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null; // This reverts the serialzed value back to its original state
    } catch (error) {
      console.error("Error retrieving from localStorage", error);
      return null;
    }
  }

  static removeItem(key) {
    // Remove an item from localStorage
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }

  static clear() {
    // Clear all localStorage data
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }
}

export default LocalStorageManager;
