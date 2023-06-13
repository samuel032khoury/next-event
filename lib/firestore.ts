import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "@firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5X0q7rp2uBeD6Gfor_EjecvMoJ3gazTg",
  authDomain: "nextevent-b93d2.firebaseapp.com",
  databaseURL: "https://nextevent-b93d2-default-rtdb.firebaseio.com",
  projectId: "nextevent-b93d2",
  storageBucket: "nextevent-b93d2.appspot.com",
  messagingSenderId: "142045614762",
  appId: "1:142045614762:web:29107e6455efa3620636d3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

export const getFirestoreCollectionKeys = async (collectionPath: string) => {
  const collectionRef = collection(db, collectionPath);
  const queryResult = query(collectionRef);
  const querySnapshot = await getDocs(queryResult);
  return querySnapshot.docs.map((doc) => doc.id);
};

export const setFirestoreDoc = async <T extends {}>(
  collectionPath: string,
  key: string,
  data: T = {} as T
): Promise<void | never> => {
  const docRef = doc(db, collectionPath, key);
  try {
    await setDoc(docRef, data);
  } catch (error) {
    console.log((error as Error).message);
    throw new Error("Internal Server Error");
  }
};
