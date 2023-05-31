import { Box, Button, Grid, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "../../axios/axios";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import Create from "../../components/Create";
import UserCard from "../../components/SingleUser";
import OeuvreCard from "../../components/OeuvreCard";

const Oeuvres = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [oeuvres, setOeuvres] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOeuvre, setSelectedOeuvre] = useState(null);

  const [openUserCard, setOpenUserCard] = useState(false);
  const [openOeuvreCard, setOpenOeuvreCard] = useState(false);

  const getOeuvres = async () => {
    await axios.get("oeuvre").then((res) => {
      setOeuvres(res.data);
    });
  };

  const deleteOeuvre = async (id) => {
    await axios.delete(`admin/oeuvre/${id}`).then((res) => {
      setOeuvres((prev) => prev.filter((row) => row.id_oeuvre !== id));
    });
  };

  const getSelectedUser = async (id) => {
    await axios.get(`admin/userById/${id}`).then((res) => {
      setSelectedUser(res.data);
    });
  };

  const handleOnCloseUserCard = () => {
    setOpenUserCard(false);
    setSelectedUser(null);
  };

  const handleOnCloseOeuvreCard = () => {
    setOpenOeuvreCard(false);
    setSelectedOeuvre(null);
  };

  useEffect(() => {
    getOeuvres();
  }, []);

  const getRowId = (row) => row.id_oeuvre;

  const actionColumn = {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.grey[400],
              }}
              onClick={() => {
                setOpenOeuvreCard(true);
                setSelectedOeuvre(params.row);
              }}
            >
              Consulter
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ color: colors.redAccent[500] }}
              onClick={() => deleteOeuvre(params.row.id_oeuvre)}
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
      <Header title="Oeuvres" subtitle="Gestion des oeuvres de l'application" />
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
        {!openUserCard && !openOeuvreCard && (
          <>
            <RefreshIcon
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={() => {
                setOeuvres([]);
                getOeuvres();
              }}
            />
            <DataGrid
              components={{ Toolbar: GridToolbar }}
              key={oeuvres.length}
              rows={oeuvres}
              getRowId={getRowId}
              columns={columns.concat(actionColumn).map((column) => ({
                ...column,
                renderCell: (params) =>
                  column.renderCell
                    ? column.renderCell({
                        ...params,
                        setOpenUserCard,
                        getSelectedUser,
                      })
                    : params.value,
              }))}
            />
          </>
        )}
        {openUserCard && selectedUser && (
          <UserCard user={selectedUser} onClose={handleOnCloseUserCard} />
        )}
        {openOeuvreCard && selectedOeuvre && (
          <OeuvreCard
            oeuvre={selectedOeuvre}
            onClose={handleOnCloseOeuvreCard}
          />
        )}
      </Box>
    </Box>
  );
};

export default Oeuvres;
