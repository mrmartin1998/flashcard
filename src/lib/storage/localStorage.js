// Object containing key names used for storing different types of data in localStorage
const STORAGE_KEYS = {
  FLASHCARDS: 'flashcards',      // Key for storing flashcard data
  CATEGORIES: 'categories',      // Key for storing category data
  STUDY_SESSIONS: 'study_sessions' // Key for storing study session data
};

// Retrieves all items of a specific type from localStorage
// Returns empty array if window is undefined (server-side) or if no items exist
const getItems = (key) => {
  // Check if code is running on client-side, return empty array if server-side
  if (typeof window === 'undefined') return [];
  // Get items from localStorage and parse JSON string to JavaScript object
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

// Saves an array of items to localStorage under specified key
// Does nothing if running server-side
const saveItems = (key, items) => {
  // Check if code is running on client-side
  if (typeof window === 'undefined') return;
  // Convert items to JSON string and save to localStorage
  localStorage.setItem(key, JSON.stringify(items));
};

// Adds a new item to the array stored under specified key
// First retrieves existing items, adds new item, then saves updated array
const addItem = (key, item) => {
  const items = getItems(key);
  items.push(item);
  saveItems(key, items);
};

// Updates an existing item by its ID with new properties
// Finds item in array by ID and merges existing data with updates
const updateItem = (key, id, updatedItem) => {
  const items = getItems(key);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    // Merge existing item with updated properties using spread operator
    items[index] = { ...items[index], ...updatedItem };
    saveItems(key, items);
  }
};

// Removes an item from storage by filtering it out by ID
// Creates new array without the specified item and saves it
const deleteItem = (key, id) => {
  const items = getItems(key);
  const filteredItems = items.filter(item => item.id !== id);
  saveItems(key, filteredItems);
};

// Export all functions and constants for use in other files
export {
  STORAGE_KEYS,
  getItems,
  saveItems,
  addItem,
  updateItem,
  deleteItem
}; 