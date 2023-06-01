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

const Techniques = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [techniques, setTechniques] = useState([]);

  const getTechniques = async () => {
    await axios.get("technique").then((res) => {
      setTechniques(res.data);
    });
  };

  const deletetechnique = async (id) => {
    await axios.delete(`/technique/${id}`).then((res) => {
      setTechniques((prev) => prev.filter((row) => row.id !== id));
    });
  };

  const getRowId = (row) => row.id;

  useEffect(() => {
    getTechniques();
  }, []);

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    flex: 0.75,
    renderCell: (params) => {
      return (
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Link
              to={`/techniques/${params.row.id}`}
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
              onClick={() => deletetechnique(params.row.id)}
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
      <Header title="Techniques" subtitle="Gestion des Techniques" />
      <Create link="create" name="technique" />
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
            setTechniques([]);
            getTechniques();
          }}
        />
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          rows={techniques}
          columns={columns.concat(actionColumn)}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Techniques;
