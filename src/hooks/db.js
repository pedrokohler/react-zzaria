import { useEffect, useState } from 'react';
import { db } from 'services/firebase';

const useCollection = (collection) => {
  const [data, setData] = useState(null);

  const loadDocs = (collection) => {
    return db.collection(collection).get().then(snapshot => {
      return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));
    })
    .catch(() => []);
  }

  useEffect(() => {
      loadDocs(collection).then(setData);
  }, [collection]);

  return data;
};

export default useCollection;
