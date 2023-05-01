import { Box, Button, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "../../axios/axios";
import { columns } from "./columns";
import { tokens } from "../../theme";

const SignalementProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [signalements, setSignalements] = useState([]);

  const getSignalements = async () => {
    await Axios.get("signalement-profile").then((res) => {
      setSignalements(res.data);
    });
  };

  useEffect(() => {
    getSignalements();
  }, []);

  const getRowId = (row) => row.id_signalement;

  const traiteSignalement = async (id_signalement, resultat) => {
    await Axios.patch(
      `signalement-profile/${id_signalement}?resultat=${resultat}`
    ).then((res) => {
      setSignalements((prev) => {
        const updatedSignalements = prev.map((signalement) => {
          if (signalement.id_signalement === id_signalement) {
            return { ...signalement, resultat };
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
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="contained"
            sx={{ color: colors.redAccent[500] }}
            onClick={() => traiteSignalement(params.row.id_signalement, false)}
          >
            Réfusé
          </Button>

          <Button
            variant="contained"
            sx={{ color: colors.greenAccent[500] }}
            onClick={() => traiteSignalement(params.row.id_signalement, true)}
          >
            Accepté
          </Button>
        </Box>
      );
    },
  };

  return (
    <Box m="20px">
      <Header
        title="Signalements profiles"
        subtitle="Gestion des Profiles signalé"
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
        }}
      >
        <DataGrid
          key={signalements.length}
          checkboxSelection
          rows={signalements}
          getRowId={getRowId}
          columns={columns.concat(actionColumn)}
        />
      </Box>
    </Box>
  );
};

export default SignalementProfile;
