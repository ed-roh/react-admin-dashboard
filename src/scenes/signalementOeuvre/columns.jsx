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
    field: "id_client",
    headerName: "Personne rapporteur",
    flex: 0.75,
    renderCell: ({ row, getSelectedUser, setOpenUserCard }) => {
      return row.id_client ? (
        <Grid container spacing={6} alignItems={"center"}>
          <Grid item xs={3}>
            <Typography>{row.id_client}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                getSelectedUser(row.id_client);
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
    field: "id_oeuvre",
    headerName: "Oeuvre signalé",
    flex: 0.75,
    renderCell: ({ row, getSelectedOeuvre, setOpenOeuvreCard }) => {
      return row.id_oeuvre ? (
        <Grid container spacing={6} alignItems={"center"}>
          <Grid item xs={3}>
            <Typography>{row.id_oeuvre}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                getSelectedOeuvre(row.id_oeuvre);
                setOpenOeuvreCard(true);
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
          <Typography style={{ fontWeight: "bold", color: "red" }}>
            {"Non-Traité"}
          </Typography>
        );
      } else {
        return (
          <Typography style={{ fontWeight: "bold", color: "green" }}>
            {"Traité"}
          </Typography>
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
      const color = row.resultat === null ? "" : row.resultat ? "green" : "red";
      return (
        <Typography style={{ fontWeight: "bold", color }}>
          {`Signalement ${status}`}
        </Typography>
      );
    },
  },
];
