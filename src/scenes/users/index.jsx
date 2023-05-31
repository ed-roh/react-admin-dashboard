import { Box, Button, Grid, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "../../axios/axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import Create from "../../components/Create";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios.get("/admin/users").then((res) => {
      setUsers(res.data);
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(`/admin/users/${id}`).then((res) => {
      setUsers((prev) => prev.filter((row) => row.id_utilisateur !== id));
    });
  };

  const ChangerStatutCompte = async (id, nouveauStatut) => {
    await axios
      .patch(`admin/users/${id}`, { statutCompte: nouveauStatut })
      .catch((err) => console.log(err))
      .then((res) => {
        setUsers((prev) => {
          const updatedUsers = prev.map((user) => {
            if (user.id_utilisateur === id) {
              if (user.Artisan) {
                return {
                  ...user,
                  Artisan: {
                    ...user.Artisan,
                    statutCompte: nouveauStatut,
                  },
                };
              } else if (user.Fournisseur) {
                return {
                  ...user,
                  Fournisseur: {
                    ...user.Fournisseur,
                    statutCompte: nouveauStatut,
                  },
                };
              }
            } else {
              return user;
            }
          });

          return updatedUsers;
        });
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getRowId = (row) => row.id_utilisateur;

  const handleClickChangeStatus = (params) => {
    if (params.row.Artisan) {
      ChangerStatutCompte(
        params.row.id_utilisateur,
        !params.row.Artisan.statutCompte
      );
    } else if (params.row.Fournisseur) {
      ChangerStatutCompte(
        params.row.id_utilisateur,
        !params.row.Fournisseur.statutCompte
      );
    } else {
      return;
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              variant="contained"
              style={
                !(params.row?.Artisan || params.row?.Fournisseur)
                  ? {
                      backgroundColor: colors.grey[400],
                    }
                  : {
                      backgroundColor: colors.grey[400],
                    }
              }
              disabled={!(params.row?.Artisan || params.row?.Fournisseur)}
              onClick={() => handleClickChangeStatus(params)}
            >
              Changer Statut
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ color: colors.redAccent[500] }}
              onClick={() => deleteUser(params.row.id_utilisateur)}
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
        title="Utilisateurs"
        subtitle="Gestion des utilisateurs de l'application"
      />
      <Create name="utilisateur" link="create" />
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
            setUsers([]);
            getUsers();
          }}
        />
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          key={users.length}
          rows={users}
          getRowId={getRowId}
          columns={columns.concat(actionColumn)}
        />
      </Box>
    </Box>
  );
};

export default Users;
