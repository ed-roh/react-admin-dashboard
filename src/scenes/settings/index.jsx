import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormInput from "../../components/FormInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Axios from "../../axios/axios";
import axios from "axios";
import dayjs from "dayjs";
import { isValidDate, isValidEmail, isValidPassword } from "../../common";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getConnectedUser = async () => {
    const { id_utilisateur } = JSON.parse(localStorage.getItem("user"));

    await Axios.get(`admin/userById/${id_utilisateur}`).then((res) => {
      setUser(res.data);
    });
  };

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "qbftnsbx");

    axios
      .post("https://api.cloudinary.com/v1_1/dgk4dzdqu/image/upload", formData)
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          photo: res.data.secure_url,
        }));
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (new Date(user?.date_de_naissance) > new Date()) {
      setError(true);
      setErrorMessage("La date de naissance doit être dans le passé");
      setLoading(false);
      return;
    }

    if (!isValidPassword(user?.password)) {
      setError(true);
      setErrorMessage("Le mot de passe doit comporter au moins 4 caractères");
    } else if (isValidEmail(user?.email)) {
      try {
        await Axios.patch(`auth/me`, user).then((res) => {
          setError(false);
          setSuccess(true);
        });
      } catch (error) {
        setError(true);
        setSuccess(false);
        console.log(error);
      }
    } else {
      setSuccess(false);
      setError(true);
      setErrorMessage("email est invalide");
    }
    setLoading(false);
  };

  useEffect(() => {
    getConnectedUser();
  }, []);

  return (
    <Box ml={5}>
      <Header
        title="MODIFIER SON COMPTE"
        subtitle="Vous pouvez modifier vos information"
      />
      {error && (
        <Alert
          variant="outlined"
          severity="error"
          sx={{
            marginTop: "10px",
            width: "fit-content",
          }}
        >
          <p>Vous avez des erreurs, veuillez vérifier les champs</p>
          <p>{errorMessage}</p>
        </Alert>
      )}
      {success && (
        <Alert
          variant="outlined"
          severity="success"
          sx={{
            marginTop: "10px",
            width: "fit-content",
          }}
        >
          <p>Utilisateur modifié avec succès</p>
        </Alert>
      )}
      {!user && <CircularProgress color="info" />}
      {user && (
        <Box>
          <Grid container direction="row" spacing={2}>
            {/* Nom */}
            <Grid item>
              <FormInput
                text="Nom"
                name="nom"
                value={user?.nom || ""}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Prenom */}
            <Grid item>
              <FormInput
                text="Prenom"
                name="prenom"
                value={user?.prenom || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>
            {/* Email */}
            <Grid item>
              <FormInput
                text="Email"
                name="email"
                type="email"
                value={user?.email || ""}
                onChange={handleInputChange}
              />
            </Grid>

            {/* date_de_naissance */}
            <Grid item display={"block"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                  Date de naissance
                </Typography>
                <DatePicker
                  value={dayjs(user?.date_de_naissance) || null}
                  onChange={(date) => {
                    setUser((prev) => ({
                      ...prev,
                      date_de_naissance: new Date(date?.$d),
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* Sexe */}
            <Grid item width="200">
              <FormControl>
                <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                  Sexe
                </Typography>
                <Select
                  required
                  fullWidth
                  value={user?.sexe || "HOMME"}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      sexe: e.target.value,
                    }));
                  }}
                >
                  <MenuItem value={"HOMME"}>Homme</MenuItem>
                  <MenuItem value={"FEMME"}>Femme</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Type */}
            <Grid item>
              <FormControl>
                <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                  Type
                </Typography>
                <Select
                  required
                  fullWidth
                  value={user?.type || "ADMIN"}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }));
                  }}
                >
                  <MenuItem value={"ADMIN"}>Administrateur</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* Téléphone */}
            <Grid item>
              <FormInput
                text="Téléphone"
                name="telephone"
                value={user?.telephone || ""}
                onChange={handleInputChange}
                type="number"
              />
            </Grid>

            {/* Photo */}
            <Grid item sm={12}>
              <Typography variant="h3" sx={{ margin: "15px 0px 5px 0  " }}>
                Photo
              </Typography>
              <img
                src={user?.photo}
                style={{
                  borderRadius: "5%",
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              />

              <TextField
                type="file"
                onChange={(e) => {
                  uploadImage(e.target.files);
                }}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ display: "block" }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              backgroundColor: colors.greenAccent[600],
              width: "fit-content",
              mt: "20px ",
            }}
          >
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={{ fontSize: "16px", width: "200px", height: "40px" }}
              disabled={
                !user?.nom ||
                !user?.prenom ||
                !user?.email ||
                !user?.date_de_naissance ||
                !user?.sexe ||
                !user?.type ||
                !user?.telephone
              }
            >
              {loading ? <CircularProgress size={24} /> : "Enregistrer"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Settings;
