import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb called to add content to the database')
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put(content);
  console.log('added content to jate database', result);
};

// Function that gets all the content from the database
export const getDb = async () => {
  console.log('getDb called to get content from the database')
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('got content from jate database', result);
  return result;
};

initdb();
