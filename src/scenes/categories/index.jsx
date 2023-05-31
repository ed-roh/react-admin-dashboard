import { Box, Button, Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
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
        <Grid container justifyContent={"space-around"}>
          <Grid item>
            <Link
              to={`/categorie/${params.row.id_categorie}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.grey[400],
                }}
              >
                Modifier
              </Button>
            </Link>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              sx={{ color: colors.redAccent[400] }}
              onClick={() => deleteCategorie(params.row.id_categorie)}
            >
              Supprimer
            </Button>
          </Grid>
        </Grid>
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
        <RefreshIcon
          style={{ marginBottom: 10, cursor: "pointer" }}
          onClick={() => {
            setCategories([]);
            getCategories();
          }}
        />
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={categories}
          columns={columns.concat(actionColumn)}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Categories;
