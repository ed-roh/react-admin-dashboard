import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCategorieByID } from "../../utils/categorie";
import SearchIcon from "@mui/icons-material/Search";

function Categorie({ id_categorie }) {
  const [categorie, setCategorie] = useState(null);

  const getCategorie = async () => {
    const response = await getCategorieByID(id_categorie);
    setCategorie(response);
  };

  useEffect(() => {
    getCategorie();
  }, [id_categorie]);

  return <Typography>{categorie?.nom_categorie}</Typography>;
}

export const columns = [
  { field: "id_oeuvre", headerName: "ID", flex: 0.25 },
  {
    field: "titre_oeuvre",
    headerName: "Titre",
    cellClassName: "name-column--cell",
    flex: 1,
  },
  {
    field: "date_realisation",
    headerName: "Date réalisation",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",

    renderCell: ({ row: { date_realisation } }) => {
      return (
        <Typography>
          {new Date(date_realisation)?.toLocaleDateString("fr-FR")}
        </Typography>
      );
    },
  },
  {
    field: "contexte_realisation",
    headerName: "Contexte",
    flex: 1,
  },
  {
    field: "dimensions",
    headerName: "Dimentions",
    flex: 0.5,
    cellClassName: "name-column--cell",
  },
  {
    field: "prix",
    headerName: "Prix",
    flex: 0.4,
  },
  {
    field: "date_publication",
    headerName: "Date publication",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",
    renderCell: ({ row: { date_publication } }) => {
      return (
        <Typography>
          {new Date(date_publication)?.toLocaleDateString("fr-FR")}
        </Typography>
      );
    },
  },
  {
    field: "id_categorie",
    headerName: "Categorie",
    renderCell: ({ row }) => {
      return <Categorie id_categorie={row.id_categorie} />;
    },
  },
  {
    field: "id_artisan",
    headerName: "Artisan",
    headerAlign: "left",
    cellClassName: "name-column--cell",
    flex: 1,
    renderCell: ({ row, setOpenUserCard, getSelectedUser }) => {
      return (
        <Grid container alignItems={"center"}>
          <Grid item xs={8}>
            <Typography>{row.id_artisan}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ cursor: "pointer", width: "fit-content" }}
              onClick={() => {
                getSelectedUser(row.id_artisan);
                setOpenUserCard(true);
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      );
    },
  },
];
