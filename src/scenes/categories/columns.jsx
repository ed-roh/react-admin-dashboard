import { Box, Typography } from "@mui/material";

export const columns = [
  { field: "id_categorie", headerName: "ID", flex: 0.25 },
  {
    field: "nom_categorie",
    headerName: "Nom Categorie",
    headerAlign: "left",
    align: "left",
    flex: 1,
    renderCell: ({ row: { nom_categorie } }) => {
      return <Typography>{nom_categorie}</Typography>;
    },
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    renderCell: ({ row: { description } }) => {
      return <Typography>{description}</Typography>;
    },
  },
  {
    field: "image_categorie",
    headerName: "Image Categorie",
    flex: 1,
    renderCell: ({ row: { image_categorie } }) => {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <a href={image_categorie} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line */}
            <img
              src={image_categorie}
              style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            />
          </a>
        </Box>
      );
    },
  },
];
