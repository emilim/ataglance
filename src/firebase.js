import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "./firebase-config";

// Initialize our firebase for our application
// @ts-ignore
let app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db = getFirestore(app);
const noteCollection = collection(db, "notes");
const userDoc = (userId) => doc(db, "users", userId);
const noteDoc = (noteId) => doc(db, "notes", noteId)

export {
    auth,
    db,
    noteCollection,
    userDoc,
    noteDoc
}