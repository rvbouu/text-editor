/*
  The idb package being required below provides some syntactic sugar around the methods needed to work with IndexedDB. Yes, the code you see below is actually a "prettier" version of what you would normally have to write. Be thankful. We've only been using the idb package since mid 2022. Before that students had to write this code with no helper methods. These students deserve a medal.
*/
import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const jatedb = "jate"

const initdb = async () =>
  openDB(jatedb, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(jatedb)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(jatedb, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  
  const jateDb = await openDB(jatedb, 1);

  const tx = jateDb.transaction(jatedb, 'readwrite');

  const store = tx.objectStore(jatedb);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
 
  const jateDb = await openDB(jatedb, 1);

  const tx = jateDb.transaction(jatedb, 'readonly');

  const store = tx.objectStore(jatedb);

  // Leave the rest as-is
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
