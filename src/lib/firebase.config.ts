import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6xQveOODxQyKD-UiKs0aFMQyL4MwcW6k",
  authDomain: "bookoutlet-35400.firebaseapp.com",
  projectId: "bookoutlet-35400",
  storageBucket: "bookoutlet-35400.appspot.com",
  messagingSenderId: "987380043065",
  appId: "1:987380043065:web:a4ccc4dea4f9c3b0ca2ce8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//project-321013263468
