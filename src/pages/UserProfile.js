import React, { useState, useEffect } from "react";
import { useAuthUser } from 'react-auth-kit';

import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField} from '@mui/material';

import axios from "../axios-instance";

function UserProfile() {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const auth = useAuthUser();
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserName(auth().user_name);
    setEmail(auth().email);
  }, []);

  const handleDisplayNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSave = () => {
    axios.post('/auth', {
        user_name: {username},
        email: {email},
      })
    .then(() => {
        setError(null);
    })
    .catch((error) => {
        setError(error);
    });
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="user">
              {auth()?.user_name?.charAt(0)}
            </Avatar>
          }
          title={auth()?.user_name}
          subheader={auth()?.email}
        />
        <Divider />
        <CardContent>
            <TextField
                id="email"
                name="email"
                label="Email address"
                value={email}
                onInput={ e=>setEmail(e.target.value)}
                onChange={handleEmailChange}
                required
            />
            <TextField
                id="user_name"
                name="user_name"
                label="User Name"
                value={username}
                onInput={ e=>setUserName(e.target.value)}
                onChange={handleDisplayNameChange}
                required
            />              
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </CardActions>
      </Card>
    </>
  );

}


export default UserProfile;