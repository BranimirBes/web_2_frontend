import {Button, Toolbar, AppBar as MaterialAppBar, Box} from "@mui/material";
import {useAuthProvider} from "../util/authProvider";
import {useNavigate} from "react-router-dom";

export const AppBar = () => {
  const authProvider = useAuthProvider();
  const isLoggedIn = authProvider.isLoggedIn();
  const navigate = useNavigate();

  const user = authProvider.getUser();

  const logout = () => {
    navigate("/");
    authProvider.updateToken("");
  };

  const login = () => {
    navigate("/login");
  }

  const profile = () => {
    if (user && user.id) {
      navigate(`/profile/${user.id}`);
    }
  }

  return (
      <MaterialAppBar position="static">
        <Toolbar>
          {isLoggedIn && user && (
              <Box>
                <Button color="inherit">{user.username}</Button>
              </Box>
          )}
          <Box sx={{width: "100%", display: "flex", justifyContent: "end"}}>
            {isLoggedIn ? (
                <>
                  <Button color="inherit" onClick={() => profile()}>Profile</Button>
                  <Button color="inherit" onClick={() => logout()}>Logout</Button>
                </>
            ) : (
                <Button color="inherit" onClick={() => login()}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </MaterialAppBar>
  )
}
