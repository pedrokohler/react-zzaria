import { useEffect, useState } from 'react';
import { db } from 'services/firebase';

const useCollection = (collection) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    db.collection(collection).get().then(snapshot => {
      const docs = [];
      snapshot.forEach(doc =>
        docs.push({
          id: doc.id,
          ...doc.data()
        })
      );
      if (mounted) setData(docs);
    }).catch(() => {
      setData([]);
    });

    return () => {
      mounted = false;
    };
  }, [collection]);

  return data;
};

export default useCollection;
