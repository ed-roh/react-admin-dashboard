import { Typography } from "@mui/material";

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
    flex: 1,
  },
  {
    field: "id_signale",
    headerName: "Personne signalé",
    flex: 0.5,
  },
  {
    field: "id_rapporteur",
    headerName: "Rapporteur",
    flex: 0.5,
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
    flex: 1,
    renderCell: (params) => {
      const etat = params.row.etatSignalement;
      if (!etat) {
        return (
          <p style={{ fontWeight: "bold", color: "red" }}>{"Non-Traité"}</p>
        );
      } else {
        return <p style={{ fontWeight: "bold", color: "green" }}>{"Traité"}</p>;
      }
    },
  },
];
