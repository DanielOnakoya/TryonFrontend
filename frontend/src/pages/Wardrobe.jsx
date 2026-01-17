import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";

export default function Wardrobe() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "users", user.uid, "tryons"),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);

      setItems(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteItem = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "tryons", id)
    );

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) {
    return (
      <p className="p-8 text-white">
        Loading wardrobe…
      </p>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br 
                    from-[#0f0a1f] via-[#1b0f2e] to-[#0b0616] 
                    text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Your Collection
      </h1>

      {items.length === 0 ? (
        <p className="text-white/60">
          No saved styles yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 
                        md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 rounded-2xl p-4 shadow-lg"
            >
              <div className="bg-white rounded-xl p-4 mb-4">
                <img
                  src={item.imageUrl}
                  className="mx-auto h-64 object-contain"
                />
              </div>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-xs text-red-400 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
