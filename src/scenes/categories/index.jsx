import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { Link } from "react-router-dom";
import Create from "../../components/Create";

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    await axios.get("categorie").then((res) => {
      setCategories(res.data);
    });
  };

  const deleteCategorie = async (id) => {
    await axios.delete(`/categorie/${id}`).then((res) => {
      setCategories((prev) => prev.filter((row) => row.id_categorie !== id));
    });
  };

  const getRowId = (row) => row.id_categorie;

  useEffect(() => {
    getCategories();
  }, []);

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    flex: 1,
    renderCell: (params) => {
      return (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            to={`/categorie/${params.row.id_categorie}`}
            style={{ textDecoration: "none", margin: 5 }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.grey[600],
                color: colors.primary[500],
              }}
            >
              Modifier
            </Button>
          </Link>
          <div>
            <Button
              variant="contained"
              sx={{ color: colors.redAccent[400] }}
              onClick={() => deleteCategorie(params.row.id_categorie)}
            >
              Supprimer
            </Button>
          </div>
        </Box>
      );
    },
  };

  return (
    <Box m="20px">
      <Header
        title="CATÉGORIES"
        subtitle="Gestion des Catégories de l'application"
      />
      <Create link="create" name="categorie" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={categories}
          columns={columns.concat(actionColumn)}
          getRowId={getRowId}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Categories;
