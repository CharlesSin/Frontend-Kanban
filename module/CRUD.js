import { collection, doc, setDoc, getDoc, getFirestore, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { app } from "../config/firebaseConfig.js";

const firestoreDB = getFirestore(app);

// Create Data
export async function createFirestoreData(collectionID, docID, data) {
  const citiesRef = collection(firestoreDB, `${collectionID}`);

  await setDoc(doc(citiesRef, docID), data);
}

// Read Data
export async function readFirestoreData(collectionID, userID = "") {
  let docRef;
  if (userID !== "") {
    docRef = doc(firestoreDB, `${collectionID}`, `${userID}`);
  } else {
    docRef = doc(firestoreDB, `${collectionID}`, "dummy");
  }
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return [];
  }
}

// Update Data
export async function updateFirestoreData() {
  const washingtonRef = doc(firestoreDB, "cities", "DC");
  await updateDoc(washingtonRef, {
    timestamp: new Date().getTime(),
    datetime: new Date(),
  });
}

// Delete Data
export async function deleteFirestoreData() {
  await deleteDoc(doc(firestoreDB, "cities", "DC"));
}
