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
  Style,
  PeopleAltOutlined,
} from "@mui/icons-material";


const Software = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Software, setSoftware] = useState([]);

  const user = useUser();
  let rows = [];

  useEffect(() => {
    if (user) {
      getSoftware();
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
          {params.field === "membersbutton" ? <PeopleAltOutlined /> : null}
        </IconButton>
      </strong>
    );
  };

  async function getSoftware() {
    let { data, error, status } = await supabase
    .from('software')
    .select(`*`)
    .eq('customer_id', user.id);
   if (data !== null) {
      let i = 0;
      data.map((asset) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: asset.name,
            vendor: asset.vendor,
            version: asset.version,
            license: asset.license,
            user_count: '33'
          },
          ...rows,
        ];
      });
      console.log(data)
      setSoftware(rows);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
  }

  const columns = [
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
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
    },
    {
      field: "version",
      headerName: "Version",
      flex: 1,
    },
    {
      field: "license",
      headerName: "License Type",
      flex: 1,
    },
    {
      field: "user_count",
      headerName: "# of Users",
      flex: 1,
    },
    {
      field: "membersbutton",
      headerName: "Users",
      width: 50,
      renderCell: renderButton,
    },

  ];

  return (
    <Box m="20px">
      <Header
        title="Your Software Assets"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
       
      >        <Button sx="margin:10px" color="secondary" variant="contained">
      New Asset
    </Button>
        <DataGrid
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
          rows={Software}
          columns={columns}
         rowHeight={32}
        />
      </Box>
    </Box>
  );
};

export default Software;
