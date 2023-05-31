import { Box, Button, Grid, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Axios from "../../axios/axios";
import { columns } from "./columns";
import { tokens } from "../../theme";
import OeuvreCard from "../../components/OeuvreCard";
import UserCard from "../../components/UserCard";

const SignalementOeuvre = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [signalements, setSignalements] = useState([]);
  const [selectedOeuvre, setSelectedOeuvre] = useState(null);
  const [openOeuvreCard, setOpenOeuvreCard] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserCard, setOpenUserCard] = useState(false);

  const getSignalements = async () => {
    await Axios.get("signalement-oeuvre").then((res) => {
      setSignalements(res.data);
    });
  };

  const getSelectedOeuvre = async (id) => {
    await Axios.get(`oeuvre/${id}`).then((res) => {
      setSelectedOeuvre(res.data);
    });
  };

  const getSelectedUser = async (id) => {
    await Axios.get(`admin/userById/${id}`).then((res) => {
      setSelectedUser(res.data);
    });
  };

  const handleCloseOeuvreCard = () => {
    setOpenOeuvreCard(false);
    setSelectedOeuvre(null);
  };

  const handleCloseUserCard = () => {
    setOpenUserCard(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    getSignalements();
  }, []);

  const getRowId = (row) => row.id_signalement;

  const traiteSignalement = async (id_signalement, resultat) => {
    await Axios.patch(
      `signalement-oeuvre/${id_signalement}?resultat=${resultat}`
    ).then((res) => {
      setSignalements((prev) => {
        const updatedSignalements = prev.map((signalement) => {
          if (signalement.id_signalement === id_signalement) {
            return { ...signalement, etatSignalement: true, resultat };
          } else {
            return signalement;
          }
        });

        return updatedSignalements;
      });
    });
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    flex: 0.75,
    renderCell: (params) => {
      return (
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              variant="contained"
              onClick={() =>
                traiteSignalement(params.row.id_signalement, false)
              }
            >
              Réfusé
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => traiteSignalement(params.row.id_signalement, true)}
            >
              Accepté
            </Button>
          </Grid>
        </Grid>
      );
    },
  };

  return (
    <Box m="20px">
      <Header
        title="Signalements Oeuvres"
        subtitle="Gestion des Oeuvres signalé"
      />
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
        {!selectedOeuvre && !selectedUser && (
          <>
            <RefreshIcon
              style={{ marginBottom: 10, cursor: "pointer" }}
              onClick={() => {
                setSignalements([]);
                getSignalements();
              }}
            />
            <DataGrid
              components={{ Toolbar: GridToolbar }}
              key={signalements.length}
              checkboxSelection
              rows={signalements}
              getRowId={getRowId}
              // for each column, if we are modifying the `renderCell`, we pass getSelectedOeuvre & setOpenOeuvreCard,
              // else we pass only the value
              columns={columns.concat(actionColumn).map((column) => ({
                ...column,
                renderCell: (params) =>
                  column.renderCell
                    ? column.renderCell({
                        ...params,
                        getSelectedOeuvre,
                        setOpenOeuvreCard,
                        getSelectedUser,
                        setOpenUserCard,
                      })
                    : params.value,
              }))}
            />
          </>
        )}
        {selectedOeuvre && openOeuvreCard && (
          <OeuvreCard oeuvre={selectedOeuvre} onClose={handleCloseOeuvreCard} />
        )}
        {selectedUser && openUserCard && (
          <UserCard user={selectedUser} onClose={handleCloseUserCard} />
        )}
      </Box>
    </Box>
  );
};

export default SignalementOeuvre;
