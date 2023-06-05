import { Box, Button, Grid, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Axios from "../../axios/axios";
import { columns } from "./columns";
import { tokens } from "../../theme";
import UserCard from "../../components/UserCard";
import AvisCard from "../../components/AvisCard";

const SignalementAvis = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [signalements, setSignalements] = useState([]);
  const [selectedAvis, setSelectedAvis] = useState(null);
  const [openAvisCard, setOpenAvisCard] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserCard, setOpenUserCard] = useState(false);

  const getSignalements = async () => {
    await Axios.get("signalement-avis").then((res) => {
      setSignalements(res.data);
    });
  };

  const getSelectedAvis = async (id) => {
    await Axios.get(`avis/${id}`).then((res) => {
      setSelectedAvis(res.data);
    });
  };

  const getSelectedUser = async (id) => {
    await Axios.get(`admin/userById/${id}`).then((res) => {
      setSelectedUser(res.data);
    });
  };

  const handleCloseAvisCard = () => {
    setOpenAvisCard(false);
    setSelectedAvis(null);
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
      `signalement-avis/${id_signalement}?resultat=${resultat}`
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
    flex: 0.8,
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
              Réfuser
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => traiteSignalement(params.row.id_signalement, true)}
            >
              Accepter
            </Button>
          </Grid>
        </Grid>
      );
    },
  };

  return (
    <Box m="20px">
      <Header
        title="Signalements Avis sur les oeuvres"
        subtitle="Gestion des Avis signalé"
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
        {!selectedAvis && !selectedUser && (
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
              // for each column, if we are modifying the `renderCell`, we pass getselectedAvis & setOpenAvisCard,
              // else we pass only the value
              columns={columns.concat(actionColumn).map((column) => ({
                ...column,
                renderCell: (params) =>
                  column.renderCell
                    ? column.renderCell({
                        ...params,
                        getSelectedAvis,
                        setOpenAvisCard,
                        getSelectedUser,
                        setOpenUserCard,
                      })
                    : params.value,
              }))}
            />
          </>
        )}
        {selectedAvis && openAvisCard && (
          <AvisCard avis={selectedAvis} onClose={handleCloseAvisCard} />
        )}
        {selectedUser && openUserCard && (
          <UserCard user={selectedUser} onClose={handleCloseUserCard} />
        )}
      </Box>
    </Box>
  );
};

export default SignalementAvis;
