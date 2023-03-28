import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (userRef) => {
      if (userRef) {
        const reference = doc(db, "users", userRef.uid);
        getDoc(reference).then((snap) => {
          if (snap.exists()) {
            const { type } = snap.data();
            if (type === "admin") {
              setUser({ ...userRef, ...snap.data() });
            } else {
              setUser({ ...userRef });
            }
          } else {
            setUser({ ...userRef });
          }
          setLoading(true);
        });
      } else {
        setUser(null);
        setLoading(true);
      }
    });
    return unsubscribe;
  }, []);
  return [user, loading];
}
export default useAuth;
