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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Axios from "../axios/axios";
import Header from "./Header";
import { tokens } from "../theme";
import FormInput from "./FormInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { isValidDate, isValidEmail, isValidPassword } from "../common";

const CreateUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [user, setUser] = useState({
    sexe: "HOMME",
    type: "ADMIN",
    statutCompte: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [willayas, setWillayas] = useState([]);
  const [selectedWillaya, setSelectedWillaya] = useState(1);

  const [dairas, setDairas] = useState([]);
  const [selectedDaira, setSelectedDaira] = useState(null);

  const [communes, setCommunes] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getWilayas();
    getCategories();
  }, []);

  const clearInputs = () => {
    setUser({
      sexe: "HOMME",
      type: "ADMIN",
      statutCompte: false,
    });
  };

  const getCategories = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}categorie`).then((res) => {
      setCategories(res.data);
      setUser((prev) => ({
        ...prev,
        preference_art: res.data[0].id_categorie,
        specialite: res.data[0].id_categorie,
      }));
    });
  };

  const getWilayas = async () => {
    await Axios.get("adresse/wilaya").then((res) => {
      setWillayas(res.data);
    });
  };

  const getDairas = async (id) => {
    await Axios.get(`adresse/daira/${id}`).then((res) => {
      setDairas(res.data);
      setSelectedDaira(res.data[0].id);

      getCommune(res.data[0].id);
    });
  };

  const getCommune = async (id) => {
    await Axios.get(`adresse/commune/${id}`).then((res) => {
      setCommunes(res.data);
      setSelectedCommune(res.data[0].id);
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

  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidDate(user?.date_de_naissance)) {
      setError(true);
      setErrorMessage("La date de naissance doit être dans le passé");
      return;
    }

    if (!isValidPassword(user?.password)) {
      setError(true);
      setErrorMessage("Le mot de passe doit comporter au moins 4 caractères");
    } else if (isValidEmail(user?.email)) {
      try {
        await axios
          .post(
            `${
              process.env.REACT_APP_API_URL
            }auth/signup/${user?.type?.toLowerCase()}`,
            { ...user, id_Commune: selectedCommune }
          )
          .then((res) => {
            setError(false);
            setSuccess(true);
            clearInputs();
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

  return (
    <Box ml={5}>
      <Header
        title={"Formulaire création utilisateur"}
        subtitle={"Veuillez remplir les champs"}
      />
      <Box>
        <Grid container direction="row" spacing={2}>
          {/* Nom */}
          <Grid item>
            <FormInput
              text="Nom"
              name="nom"
              value={user?.nom || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </Grid>

          {/* Prenom */}
          <Grid item>
            <FormInput
              text="Prenom"
              name="prenom"
              value={user?.prenom || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </Grid>

          {/* date_de_naissance */}
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                Date de naissance
              </Typography>
              <DatePicker
                value={user?.date_de_naissance || null}
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
          {/* Email */}
          <Grid item>
            <FormInput
              text="Email"
              name="email"
              type="email"
              value={user?.email || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </Grid>

          {/* Mot de passe */}
          <Grid item>
            <FormInput
              text="Mot de passe"
              name="password"
              value={user?.password || ""}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              InputProps={{
                endAdornment: showPassword ? (
                  <VisibilityOff onClick={handleShowPasswordClick} />
                ) : (
                  <Visibility onClick={handleShowPasswordClick} />
                ),
              }}
            />
          </Grid>

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
                value={user?.type || "CLIENT"}
                onChange={(e) => {
                  setUser((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }));
                }}
              >
                <MenuItem value={"ADMIN"}>Administrateur</MenuItem>
                <MenuItem value={"ARTISAN"}>Artisan</MenuItem>
                <MenuItem value={"FOURNISSEUR"}>Fournisseur</MenuItem>
                <MenuItem value={"CLIENT"}>Client</MenuItem>
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
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
              type="number"
            />
          </Grid>

          {/* Photo */}
          <Grid item>
            <Typography variant="h3" sx={{ margin: "15px 0px 5px 0  " }}>
              Photo
            </Typography>
            <TextField
              type="file"
              onChange={(e) => {
                uploadImage(e.target.files);
              }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2}>
          {/* Wilaya */}
          <Grid item>
            <FormControl>
              <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                Wilaya
              </Typography>
              <Select
                required
                fullWidth
                value={selectedWillaya || `1`}
                onChange={async (e) => {
                  setSelectedWillaya(e.target.value);
                  getDairas(e.target.value);
                }}
              >
                {willayas.map((willaya) => (
                  <MenuItem key={willaya.id} value={willaya.id}>
                    {willaya.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Daira */}
          {selectedDaira && (
            <Grid item>
              <FormControl>
                <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                  Daira
                </Typography>
                <Select
                  required
                  fullWidth
                  value={selectedDaira || `1`}
                  onChange={async (e) => {
                    setSelectedDaira(e.target.value);
                    getCommune(e.target.value);
                  }}
                >
                  {dairas.map((daira) => (
                    <MenuItem key={daira.id} value={daira.id}>
                      {daira.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Commune */}
          {selectedCommune && (
            <Grid item>
              <FormControl>
                <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                  Commune
                </Typography>
                <Select
                  required
                  fullWidth
                  value={selectedCommune || `1`}
                  onChange={(e) => {
                    setSelectedCommune(e.target.value);
                  }}
                >
                  {communes.map((commune) => (
                    <MenuItem key={commune.id} value={commune.id}>
                      {commune.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>

        {/* Rue */}
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <FormInput
              text="Rue"
              name="Rue"
              value={user?.Rue || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </Grid>
        </Grid>

        {user?.type && (
          <Grid container direction="row" spacing={2}>
            {user?.type === "CLIENT" && (
              <Grid item>
                <FormControl>
                  <Typography variant="h3" sx={{ margin: "15px 0px 5px 0px" }}>
                    Préférence Art
                  </Typography>
                  <Select
                    required
                    fullWidth
                    value={user?.preference_art || 2}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        preference_art: e.target.value,
                      }));
                    }}
                  >
                    {categories?.map((cat) => (
                      <MenuItem key={cat.id_categorie} value={cat.id_categorie}>
                        {cat.nom_categorie}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {user?.type === "ARTISAN" && (
              <>
                <Grid item>
                  <FormControl>
                    <Typography
                      variant="h3"
                      sx={{ margin: "15px 0px 5px 0px" }}
                    >
                      Spécialité
                    </Typography>
                    <Select
                      required
                      fullWidth
                      value={user?.specialite || 2}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          specialite: e.target.value,
                        }));
                      }}
                    >
                      {categories?.map((cat) => (
                        <MenuItem
                          key={cat.id_categorie}
                          value={cat.id_categorie}
                        >
                          {cat.nom_categorie}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item>
                  <FormInput
                    text="Description"
                    name="description"
                    value={user?.description || ""}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </Grid>

                <Grid item>
                  <>
                    <Typography
                      variant="h3"
                      sx={{ margin: "15px 0px 5px 0px" }}
                    >
                      Année debut expérience
                    </Typography>
                    <TextField
                      required
                      variant="filled"
                      name="annee_debut_experience"
                      fullWidth
                      value={user?.annee_debut_experience || ""}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          [e.target.name]: parseInt(e.target.value),
                        }));
                      }}
                      inputProps={{
                        type: "number",
                        min: "1950",
                        max: new Date().getFullYear().toString(),
                      }}
                    />
                  </>
                </Grid>
              </>
            )}

            {user?.type === "FOURNISSEUR" && (
              <Grid item>
                <FormInput
                  text="Raison sociale"
                  name="raison_social"
                  value={user?.raison_social || ""}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </Grid>
            )}
          </Grid>
        )}
        <Box
          sx={{
            backgroundColor: colors.greenAccent[600],
            width: "fit-content",
            mt: "40px",
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{
              fontSize: "16px",
              width: "200px",
              height: "40px",
            }}
            // disabled={
            //   !user?.nom ||
            //   !user?.prenom ||
            //   !user?.date_de_naissance ||
            //   !user?.Rue ||
            //   !user?.email ||
            //   !user?.password ||
            //   !user?.telephone ||
            //   !user?.photo
            // }
          >
            {loading ? <CircularProgress size={24} /> : "Enregistrer"}
          </Button>
        </Box>
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
            <p>Utilisateur ajouté avec success</p>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default CreateUser;
