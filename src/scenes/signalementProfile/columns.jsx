import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Typography } from "@mui/material";

export const columns = [
  { field: "id_signalement", headerName: "ID", flex: 0.25 },
  {
    field: "raison",
    headerName: "Raison",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 0.5,
    renderCell: ({ row: { date } }) => {
      return (
        <Typography>{new Date(date).toLocaleDateString("fr-FR")}</Typography>
      );
    },
  },
  {
    field: "id_signale",
    headerName: "Personne signalé",
    flex: 0.75,
    renderCell: ({ row, getSelectedUser, setOpenUserCard }) => {
      return row.id_signale ? (
        <Grid container spacing={6} alignItems={"center"}>
          <Grid item xs={3}>
            <Typography>{row.id_signale}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                getSelectedUser(row.id_signale);
                setOpenUserCard(true);
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography>{"Utilisateur supprimé"}</Typography>
      );
    },
  },
  {
    field: "id_rapporteur",
    headerName: "Rapporteur",
    flex: 0.75,
    renderCell: ({ row, getSelectedUser, setOpenUserCard }) => {
      return row.id_rapporteur ? (
        <Grid container spacing={6} alignItems={"center"}>
          <Grid item xs={3}>
            <Typography>{row.id_rapporteur}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                getSelectedUser(row.id_rapporteur);
                setOpenUserCard(true);
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography>{"Utilisateur supprimé"}</Typography>
      );
    },
  },
  {
    field: "id_admin",
    headerName: "Admin responsable",
    flex: 0.5,
    renderCell: (params) => {
      if (params.row.id_admin) {
        return <Typography>{params.row.id_admin}</Typography>;
      } else {
        return <p> / </p>;
      }
    },
  },
  {
    field: "etatSignalement",
    headerName: "état signalement",
    flex: 0.5,
    renderCell: (params) => {
      const etat = params.row.etatSignalement;
      if (!etat) {
        return (
          <p
            style={{
              fontWeight: "bold",
              color: "#E74646",
              fontSize: "1.05rem",
            }}
          >
            {"Non-Traité"}
          </p>
        );
      } else {
        return (
          <p
            style={{
              fontWeight: "bold",
              color: "#009900",
              fontSize: "1.05rem",
            }}
          >
            {"Traité"}
          </p>
        );
      }
    },
  },
  {
    field: "resultat",
    headerName: "Resultat signalement",
    flex: 1,
    renderCell: ({ row }) => {
      const status =
        row.resultat === null
          ? "Pas encore traité"
          : row.resultat
          ? "Accepté"
          : "Réfusé";
      const color =
        row.resultat === null ? "" : row.resultat ? "#009900" : "#E74646";
      return (
        <p style={{ fontWeight: "bold", color, fontSize: "1.05rem" }}>
          {`Signalement ${status}`}
        </p>
      );
    },
  },
  {
    field: "date_resultat",
    headerName: "Date réponse",
    flex: 0.75,
    renderCell: ({ row: { date_resultat } }) => {
      return (
        <Typography>{date_resultat ? `${date_resultat}` : `/`}</Typography>
      );
    },
  },
];
