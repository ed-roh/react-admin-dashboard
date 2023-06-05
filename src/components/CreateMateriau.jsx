import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "../axios/axios";
import Header from "./Header";
import { tokens } from "../theme";
import { useParams } from "react-router-dom";

const CreateMateriau = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();

  const [materiau, setMateriau] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const clearInputs = () => {
    setMateriau(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await Axios.patch(`materiau/${id}`, materiau).then(() => {
          setError(false);
          setSuccess(true);
        });
      } else {
        await Axios.post(`materiau`, materiau).then(() => {
          setError(false);
          setSuccess(true);
          clearInputs();
        });
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getMateriau = async (id) => {
    await Axios.get(`materiau/${id}`).then((res) => {
      setMateriau(res.data);
    });
  };

  useEffect(() => {
    if (id) {
      getMateriau(id);
    }
  }, []);

  return (
    <Box ml={5}>
      <Header
        title={
          id
            ? `Formulaire modification d'un matériau`
            : `Formulaire création d'un matériau`
        }
        subtitle={"Veuillez remplir les champs"}
      />
      <Box>
        {/* Nom matériau */}
        <Typography variant="h3" sx={{ margin: "15px 0px 5px 0" }}>
          Nom matériau
        </Typography>
        <TextField
          required
          name="nom"
          value={materiau?.nom || ""}
          variant="filled"
          onChange={(e) => {
            setMateriau((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
        />

        <Box
          sx={{
            backgroundColor: colors.greenAccent[600],
            width: "fit-content",
            mt: "20px",
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{ fontSize: "16px", width: "200px", height: "40px" }}
            disabled={!materiau?.nom}
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
            {id ? (
              <p>Matériau modifié avec succès</p>
            ) : (
              <p>Matériau ajouté avec succès</p>
            )}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default CreateMateriau;
