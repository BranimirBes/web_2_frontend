import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as profileApi from "../api/profile";
import {Profile} from "../api/types";
import {ProfileInfo} from "../components/ProfileInfo";
import {useAuthProvider} from "../util/authProvider";
import {Alert, Box, Checkbox, FormControlLabel, Typography} from "@mui/material";

export type ProfilePageProps = {
  enableBrokenAccess: boolean,
  setEnableBrokenAccess: () => void;
};

export const ProfilePage = (props: ProfilePageProps) => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
  const params = useParams();

  const isLoggedIn = authProvider.isLoggedIn();
  const token = authProvider.getToken();

  const [profile, setProfile] = React.useState<Profile | undefined>(undefined);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    return () => {
      setProfile(undefined);
      setErrorMessage("");
    }
  }, [])

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      profileApi.getProfile(token, {
        id: params.id as string,
        enableBrokenAccess: props.enableBrokenAccess
      })
          .then((profile) => {
            setProfile(profile);
            setErrorMessage("");
          })
          .catch((reason => {
            setErrorMessage(reason as string);
          }))
    }
  }, [props.enableBrokenAccess, params.id, token]);


  return (
      <Box>
        <Box sx={{width: "100%", display: "flex", justifyContent: "center", marginBottom: "2rem", marginTop: "1rem"}}>
          <FormControlLabel
              label="Uključi Broken Access"
              control={<Checkbox checked={props.enableBrokenAccess}
                                 onChange={() => props.setEnableBrokenAccess()}/>}
          />
          <Typography variant="h4" gutterBottom component="div">
            Profile
          </Typography>
        </Box>
        <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
          {errorMessage && (
              <Alert severity="error">{errorMessage}</Alert>
          )}
          {profile && (
              <ProfileInfo profile={profile}/>
          )}
        </Box>
      </Box>
  );
};
