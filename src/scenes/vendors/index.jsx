import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import {
  EditOutlined,
  PreviewOutlined,
  DeleteForeverOutlined,
  ForwardToInboxOutlined,
  Style,
} from "@mui/icons-material";

import { useProfile } from "utils/profile";
import SimpleBackDrop from "../../components/SimpleBackDrop";

const Vendors = () => {
  const theme = useTheme();
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const profile = useProfile();
  const user = profile.user;


  useEffect(() => {
    if (user) {
      getVendors();
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

  async function getVendors() {
    setIsLoading(true);
    let { data, error, status } = await supabase
    .from('vendors')
    .select(`*`)
    .eq('customer_id', profile.customer.id);
   if (data !== null) {
      let i = 0;
      let rows =[];
      data.map((vendor) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: vendor.name,
            devices: 33,
            software: 33,
            contracts: 3,
          },
          ...rows,
        ];
        setVendors(rows);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
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
      field: "devices",
      headerName: "Devices",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "software",
      headerName: "Licenses",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contracts",
      headerName: "Contracts",
      flex: 1,
      cellClassName: "name-column--cell",
    },

  ];

  if (isLoading) {
    return <SimpleBackDrop />;
  }

  return (
    <Box m="20px">
      <Header
        title="Vendors"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
       
      >
        <Button sx="margin:10px" color="secondary" variant="contained">
          New Vendor
        </Button>
        <DataGrid
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
          rows={vendors}
          columns={columns}
         rowHeight={32}
        />
      </Box>
    </Box>
  );
};

export default Vendors;
