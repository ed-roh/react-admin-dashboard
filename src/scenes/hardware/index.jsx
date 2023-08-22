import Header from "../../components/Header";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  EditOutlined,
  PreviewOutlined,
  DeleteForeverOutlined,
  ForwardToInboxOutlined,
} from "@mui/icons-material";
import { useProfile } from "utils/profile";
import SimpleBackDrop from "../../components/SimpleBackDrop";

const Hardware = () => {
  const [Hardware, setHardware] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const profile = useProfile();
  const user = profile.user;

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) {
      getHardware();
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
          {params.field === "invitebutton" ? <ForwardToInboxOutlined /> : null}
          {params.field === "reviewbutton" ? <PreviewOutlined /> : null}
        </IconButton>
      </strong>
    );
  };

  async function getHardware() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("hardware")
      .select(`*`)
      .eq("customer_id", profile.customer.id);
    if (data !== null) {
      let i = 0;
      let rows = [];
      data.map((asset) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: asset.hostname,
            ip_address: asset.ip_address,
            mac_address: asset.mac_address,
            vendor: asset.vendor,
            type: asset.type,
            os: asset.os,
            user_count: 33,
          },
          ...rows,
        ];
        setHardware(rows);
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
      field: "mac_address",
      headerName: "Mac Address",
      flex: 1,
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      flex: 1,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "os",
      headerName: "OS",
      flex: 1,
    },
  ];

  if (isLoading) {
    return <SimpleBackDrop />;
  }

  return (
    <Box m="20px">
      <Header title="Your Hardware Assets" />
      <Box m="40px 0 0 0" height="75vh">
        {" "}
        <Button sx="margin:10px" color="secondary" variant="contained">
          New Asset
        </Button>
        <DataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rows={Hardware}
          columns={columns}
          rowHeight={32}
        />
      </Box>
    </Box>
  );
};

export default Hardware;
