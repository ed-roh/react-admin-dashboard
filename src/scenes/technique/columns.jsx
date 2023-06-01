import { Box, Typography } from "@mui/material";

export const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "nom",
    headerName: "Nom Technique",
    headerAlign: "left",
    align: "left",
    flex: 1.5,
    renderCell: ({ row: { nom } }) => {
      return <Typography>{nom}</Typography>;
    },
  },
];
