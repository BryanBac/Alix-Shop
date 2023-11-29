import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import app from "../../../../firebase";

const firestore = getFirestore(app);

const obtenerPorId = async (nombre, documentId) => {
  try {
    const docRef = doc(firestore, nombre, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      return data;
    } else {
      console.error("Document does not exist!");
      return null; // or you can throw an error if you prefer
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error; // or you can return null if you prefer
  }
};

export default obtenerPorId;

