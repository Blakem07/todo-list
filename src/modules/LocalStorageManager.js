/**
 * A utility class for managing interactions with the browser's `localStorage`.
 * Provides methods for setting, getting, removing, and clearing items in localStorage.
 * 
 * @class LocalStorageManager
 */
class LocalStorageManager {
  /**
   * Saves an item to `localStorage` after serializing it.
   * If the item cannot be saved, an error is logged to the console.
   *
   * @static
   * @param {string} key - The key under which the value will be stored in localStorage.
   * @param {*} value - The value to be stored. It will be serialized using JSON.stringify().
   * @returns {void}
   * @throws {Error} If the data cannot be serialized or saved to localStorage.
   */
  static setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  /**
   * Retrieves an item from `localStorage` and deserializes it.
   * If the item is not found or an error occurs, `null` is returned.
   *
   * @static
   * @param {string} key - The key of the item to retrieve from localStorage.
   * @returns {*|null} The parsed value from localStorage or `null` if not found or an error occurs.
   * @throws {Error} If the data cannot be parsed from localStorage.
   */
  static getItem(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error("Error retrieving from localStorage", error);
      return null;
    }
  }

  /**
   * Removes an item from `localStorage`.
   * If an error occurs during removal, it is logged to the console.
   *
   * @static
   * @param {string} key - The key of the item to remove from localStorage.
   * @returns {void}
   * @throws {Error} If the item cannot be removed from localStorage.
   */
  static removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }

  /**
   * Clears all items in `localStorage`.
   * If an error occurs during clearing, it is logged to the console.
   *
   * @static
   * @returns {void}
   * @throws {Error} If localStorage cannot be cleared.
   */
  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }
}

export default LocalStorageManager;

