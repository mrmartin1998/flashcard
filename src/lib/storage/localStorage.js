// Object containing key names used for storing different types of data in localStorage
export const STORAGE_KEYS = {
  FLASHCARDS: 'flashcards',
  STUDY_SESSIONS: 'study_sessions'
};

// Retrieves all items of a specific type from localStorage
export const getItems = (key) => {
  if (typeof window === 'undefined') return [];
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

// Saves an array of items to localStorage
export const saveItems = (key, items) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(items));
};

// Adds a new item to storage
export const addItem = (key, item) => {
  const items = getItems(key);
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
  return items;
};

// Updates an existing item by ID
export const updateItem = (key, id, updatedData) => {
  const items = getItems(key);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedData };
    localStorage.setItem(key, JSON.stringify(items));
  }
  return items;
};

// Deletes an item by ID
export const deleteItem = (key, id) => {
  const items = getItems(key);
  const filteredItems = items.filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(filteredItems));
  return filteredItems;
}; 