import React, { useState } from "react";
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { tokens } from "../../theme";
import axios from "../../axios/axios";
import Copyright from "../../components/Copyright";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      const response = await axios.post("auth/login", data);
      const { user, token } = response.data;

      if (user && user.type !== "ADMIN") {
        setError(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      login(userData);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "AppWorkspace" }}>
            <AccountCircleIcon fontSize="large" style={{ color: "#00917C" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'identifier
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              inputProps={{ maxLength: 100 }}
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, email: e.target.value };
                });
                setEmail((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              inputProps={{ minLength: 6 }}
              error={password?.length > 0 && password?.length < 6}
              helperText="Minimum de 6 caractères"
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, password: e.target.value };
                });
                setPassword((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />

            {error && (
              <Alert variant="outlined" severity="warning">
                {<p>Email ou mot de passe ou role est incorrecte.</p>}
              </Alert>
            )}
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2, mb: 2 }}
              style={{ backgroundColor: "#00917C" }}
              type="submit"
              onClick={handleLogin}
              disabled={!(email && password)}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
        Mot de passe oublié?
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
