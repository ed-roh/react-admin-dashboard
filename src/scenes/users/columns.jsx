import { Box, Typography } from "@mui/material";
import Axios from "../../axios/axios";
import React, { useEffect, useState } from "react";

function SpecialiteColumn({ specialite }) {
  const [categorie, setCategorie] = useState("");

  useEffect(() => {
    Axios.get(`categorie/${specialite}`)
      .then((res) => setCategorie(res.data.nom_categorie))
      .catch((err) => console.log(err));
  }, [specialite]);

  return <Typography>{categorie}</Typography>;
}

export const columns = [
  { field: "id_utilisateur", headerName: "ID", flex: 0.25 },
  {
    field: "nom",
    headerName: "Nom",
    cellClassName: "name-column--cell",
  },
  {
    field: "prenom",
    headerName: "Prénom",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "date_de_naissance",
    headerName: "Date de naissance",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",

    renderCell: ({ row: { date_de_naissance } }) => {
      return (
        <Typography>
          {new Date(date_de_naissance)?.toLocaleDateString("fr-FR")}
        </Typography>
      );
    },
  },
  {
    field: "sexe",
    headerName: "Sexe",
    flex: 0.3,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "telephone",
    headerName: "Telephone",
    flex: 0.4,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.4,
    cellClassName: "name-column--cell",
  },
  {
    field: "date_inscription",
    headerName: "Date inscription",
    headerAlign: "left",
    align: "left",
    renderCell: ({ row: { date_inscription } }) => {
      return (
        <Typography>
          {new Date(date_inscription)?.toLocaleDateString("fr-FR")}
        </Typography>
      );
    },
  },
  {
    field: "Artisan.statutCompte",
    headerName: "Statut Compte",
    flex: 0.5,
    cellClassName: "name-column--cell",

    renderCell: (params) => {
      const artisan = params.row.Artisan || params.row.Fournisseur;
      if (artisan) {
        return artisan.statutCompte ? (
          <p style={{ fontWeight: "bold", color: "green" }}>{"Actif"}</p>
        ) : (
          <p style={{ fontWeight: "bold", color: "red" }}>{"Inactif"}</p>
        );
      } else {
        return <p style={{ fontWeight: "bold", color: "green" }}>{"Actif"}</p>;
      }
    },
  },
  {
    field: "specialite",
    headerName: "Specialite",
    renderCell: ({ row }) => {
      if (row.Artisan) {
        return <SpecialiteColumn specialite={row.Artisan.specialite} />;
      } else if (row.Client) {
        return <SpecialiteColumn specialite={row.Client.preference_art} />;
      } else {
        return <p> / </p>;
      }
    },
  },
  // {
  //   field: "description",
  //   headerName: "Description",
  //   flex: 1,
  //   renderCell: (params) => {
  //     const artisan = params.row.Artisan;
  //     if (artisan) {
  //       return <Typography>{artisan.description}</Typography>;
  //     } else {
  //       return <p> / </p>;
  //     }
  //   },
  // },
  // {
  //   field: "annee_experience",
  //   headerName: "Exp",
  //   type: "number",
  //   headerAlign: "left",
  //   flex: 0.25,
  //   renderCell: (params) => {
  //     const artisan = params.row.Artisan;
  //     if (artisan) {
  //       return artisan.annee_experience;
  //     } else {
  //       return <p> / </p>;
  //     }
  //   },
  // },
  {
    field: "photo",
    headerName: "Photo",
    flex: 0.5,
    renderCell: ({ row: { photo } }) => {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* eslint-disable-next-line */}
          <img
            src={photo}
            alt="photo de profile"
            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
          />
        </Box>
      );
    },
  },
];
