import {Profile} from "../api/types";
import {Box, Stack, TextField} from "@mui/material";

export type ProfileInfoProps = {
  profile: Profile
}

export const ProfileInfo = (props: ProfileInfoProps) => {
  return (
      <Stack direction="row" sx={{width: "40rem"}}>
        <Box>
          <img src={props.profile.profilePicture} style={{
            objectFit: "cover",
            width: "20rem",
            height: "20rem"
          }}/>
        </Box>
        <Box sx={{width: "20rem"}}>
          <Stack spacing={2} sx={{marginLeft: "2rem"}}>
            <TextField
                id="profile-username-id"
                label="Username"
                defaultValue={props.profile.username}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
            />
            <TextField
                id="profile-first-name-id"
                label="First name"
                defaultValue={props.profile.firstName}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
            />
            <TextField
                id="profile-last-name-id"
                label="Last name"
                defaultValue={props.profile.lastName}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
            />
            <TextField
                id="profile-email-id"
                label="Email"
                defaultValue={props.profile.email}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
            />
          </Stack>
        </Box>
      </Stack>
  )
}
