import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { supabase } from "../../supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {
  EditOutlined,
  PreviewOutlined,
  DeleteForeverOutlined,
  ForwardToInboxOutlined,
} from "@mui/icons-material";


const RiskRegister = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [risks, setRisks] = useState([]);

  const user = useUser();
  let rows = [];

  useEffect(() => {
    if (user) {
      getRisks();
    }
  }, [user]);

  const renderButton = (params) => {
    return (
      <strong>
        <IconButton
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          {params.field === "editbutton" ? <EditOutlined /> : null}
          {params.field === "deletebutton" ? <DeleteForeverOutlined /> : null}
          {params.field === "invitebutton" ? (
            <ForwardToInboxOutlined />
          ) : null}
          {params.field === "reviewbutton" ? <PreviewOutlined /> : null}
        </IconButton>
      </strong>
    );
  };

  async function getRisks() {
    let { data, error, status } = await supabase
    .from('risks')
    .select(`*`)
    .eq('customer_id', user.id);
   if (data !== null) {
      let i = 0;
      rows = [];
      data.map((risk) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: risk.name,
            likelihood: risk.likelihood,
            imapact: risk.impact,
            loe: risk.loe,
            notes: risk.notes,
            status: risk.status,
            created_at: risk.created_at,
            last_reviewed: risk.last_reviewed,

   
          },
          ...rows,
        ];
      });
      setRisks(rows);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      flex: 1,
    },
    {
      field: "imapact",
      headerName: "Impact",
      flex: 1,
    },
    {
      field: "loe",
      headerName: "Level of Effort",
      flex: 1,
    },
    {
      field: "notes",
      headerName: "Notes",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 1,
    },    {
      field: "last_reviewed",
      headerName: "Last Reviewed",
      flex: 1,
    },
    {
      field: "editbutton",
      headerName: "Edit",
      width: 50,
      renderCell: renderButton,
    },
    {
      field: "deletebutton",
      headerName: "Delete",
      width: 100,
      renderCell: renderButton,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Risk Register"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
       
      >        
    <Button sx={{margin: "10px"}} color="secondary" variant="contained">
      New Risk
    </Button>
        <DataGrid
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
          rows={risks}
          columns={columns}
         rowHeight={32}
        />
      </Box>
    </Box>
  );
};

export default RiskRegister;
