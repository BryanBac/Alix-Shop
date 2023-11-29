import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../../../../firebase";

const firestore = getFirestore(app);

const enviarId = async (nombre, data) => {
  try {
    const docRef = await addDoc(collection(firestore, nombre), data);
    const newDocId = docRef.id;
    return newDocId;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error; // or handle the error as needed
  }
};

export default enviarId;
