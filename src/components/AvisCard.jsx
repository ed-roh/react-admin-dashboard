import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../axios/axios";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const AvisCard = ({ avis, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [user, setUser] = useState(null);
  const { id_avis, id_utilisateur, id_oeuvre, contenu, date_avis } = avis;

  const deleteAvis = async (id_avis) => {
    await axios.delete(`/avis/${id_avis}`).catch((err) => {
      console.log(err);
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(`/admin/users/${id}`).catch((err) => {
      console.log(err);
    });
  };

  const getSelectedUser = async (id) => {
    await axios.get(`admin/userById/${id}`).then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    getSelectedUser(id_utilisateur);
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          user ? ` Signalement de l'avis de ${user.nom} ${user.prenom}` : ""
        }
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        {!user?.photo && <CircularProgress color="success" />}
        {user?.photo && (
          <img
            src={user?.photo}
            alt={`${user?.nom} ${user?.prenom}`}
            style={{ maxWidth: "100%", marginBottom: "16px" }}
          />
        )}
        <Typography variant="subtitle1" gutterBottom>
          <strong>Type:</strong> {user?.type}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user?.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Téléphone:</strong> {user?.telephone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Date de naissance:</strong>{" "}
          {new Date(user?.date_de_naissance)?.toLocaleDateString("fr-FR")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Sexe:</strong> {user?.sexe}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Date écriture avis:</strong>{" "}
          {new Date(date_avis)?.toLocaleDateString("fr-FR")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>L'avis:</strong>
        </Typography>{" "}
        <h1>{contenu}</h1>
        <Box display={"flex"} flexDirection={"column"} width="30%">
          <Button
            variant="contained"
            sx={{ mt: 5, color: colors.redAccent[500] }}
            onClick={() => deleteAvis(id_avis)}
          >
            Supprimer l'avis
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 5, color: colors.redAccent[500] }}
            onClick={() => deleteUser(user?.id_utilisateur)}
          >
            Sanctionner Utilisateur
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AvisCard;
