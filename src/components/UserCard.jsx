import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../axios/axios";
import { tokens } from "../theme";

const UserCard = ({ user, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    nom,
    prenom,
    date_de_naissance,
    sexe,
    email,
    telephone,
    type,
    photo,
  } = user;

  const deleteUser = async (id) => {
    await axios.delete(`/admin/users/${id}`).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Card>
      <CardHeader
        title={`${nom} ${prenom}`}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        {!photo && <CircularProgress color="success" />}
        {photo && (
          <img
            src={photo}
            alt={`${nom} ${prenom}`}
            style={{ maxWidth: "100%", marginBottom: "16px" }}
          />
        )}

        <Typography variant="subtitle1" gutterBottom>
          {type}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Téléphone:</strong> {telephone}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Date de naissance:</strong>{" "}
          {new Date(date_de_naissance)?.toLocaleDateString("fr-FR")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Sexe:</strong> {sexe}
        </Typography>
        {user?.Artisan && (
          <Typography variant="body1" gutterBottom>
            <strong>Description:</strong> {user?.Artisan?.description}
          </Typography>
        )}

        <Button
          variant="contained"
          sx={{ mt: 5, color: colors.redAccent[500] }}
          onClick={() => deleteUser(user?.id_utilisateur)}
        >
          Supprimer
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
