import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB166VwUQegvw2sQOzW7HE6KFTAqodYAC0",
  authDomain: "my-panel-92ba9.firebaseapp.com",
  projectId: "my-panel-92ba9",
  storageBucket: "my-panel-92ba9.appspot.com",
  messagingSenderId: "937552058321",
  appId: "1:937552058321:web:629fa870bae6d8c7a232f0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default app;
