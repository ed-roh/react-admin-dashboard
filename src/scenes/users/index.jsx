import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "../../axios/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    getUsers();
  }, []);

  const getRowId = (row) => row.id_utilisateur;

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            to={`/users/${params.row.id_utilisateur}`}
            style={{ textDecoration: "none", margin: 5 }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.grey[400],
                color: colors.primary[700],
              }}
            >
              Modifier
            </Button>
          </Link>
          <div>
            <Button
              variant="contained"
              sx={{ color: colors.redAccent[500] }}
              onClick={() => deleteUser(params.row.id_utilisateur)}
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
        title="Utilisateurs"
        subtitle="Gestion des utilisateurs de l'application"
      />
      <Create name="user" link="create" />
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
        }}
      >
        <DataGrid
          key={users.length}
          checkboxSelection
          rows={users}
          getRowId={getRowId}
          columns={columns.concat(actionColumn)}
        />
      </Box>
    </Box>
  );
};

export default Users;
