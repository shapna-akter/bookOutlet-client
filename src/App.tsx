import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch } from "./redux/hooks";
import { useEffect} from "react";
import { auth } from "./lib/firebase.config";
import { setUser } from "./redux/features/users/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      if (CurrentUser) { 
        dispatch(setUser(CurrentUser)); 
      }
    });
  }, [dispatch]);

  return (
    <div className="" >
      <MainLayout />
    </div>
  );
}

export default App;
