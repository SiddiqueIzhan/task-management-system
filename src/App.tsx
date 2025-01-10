import { useEffect, useState } from "react";
import "./App.css";
import Login, { auth } from "./pages/login";
import TaskPage from "./pages/TaskPage";
import { onAuthStateChanged, User } from "firebase/auth";
import { FormProvider } from "./context/formContext";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userD) => {
      if (userD) {
        setUser(userD);
      } else setUser(null);
    });
  }, []);

  if (user === null) return <Login />;

  return (
    <FormProvider>
      <TaskPage user={user} />
    </FormProvider>
  );
}

export default App;
