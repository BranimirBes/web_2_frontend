import React from 'react';
import './App.css';
import {LoginPage} from "./pages/LoginPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {ProfilePage} from "./pages/ProfilePage";
import {HomePage} from "./pages/HomePage";
import {useAuthProvider, useSessionStorage} from "./util/authProvider";
import {AppBar} from "./components/AppBar";
import {LoginResponse} from "./api/types";

function App() {
  const authProvider = useAuthProvider();
  const enableBrokenAccess = useSessionStorage("enableBrokenAccess")
  const [enableBrokenAccessState, setEnableBrokenAccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const valueString = enableBrokenAccess.getItem();
    const valueStringBool = (!(valueString === "" || valueString === "false"));
    setEnableBrokenAccess(valueStringBool);
  }, [])

  const switchEnableBrokenAccessState = () => {
    setEnableBrokenAccessValue(!enableBrokenAccessState);
  }

  const setEnableBrokenAccessValue = (value: boolean) => {
    enableBrokenAccess.setItem(String(value));
    setEnableBrokenAccess(value);
  };

  const succesfulLogin = (response: LoginResponse) => {
    authProvider.updateToken(response.token);
    authProvider.updateUser(response.user);
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<>
            <AppBar/>
            <LoginPage succesfulLogin={succesfulLogin}/>
          </>}
          />
          <Route path="/profile/:id" element={<>
            <AppBar/>
            <ProfilePage
                enableBrokenAccess={enableBrokenAccessState}
                setEnableBrokenAccess={switchEnableBrokenAccessState}
            />
          </>}/>
          <Route path="/" element={<>
            <AppBar/>
            <HomePage/>
          </>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
