import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { supabase } from "../../supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  EditOutlined,
  PreviewOutlined,
  DeleteForeverOutlined,
  ForwardToInboxOutlined,
  Style,
} from "@mui/icons-material";

const Meetings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [meetings, setMeetings] = useState([]);

  const user = useUser();
  let rows = [];

  useEffect(() => {
    if (user) {
      getMeetings();
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

  async function getMeetings() {
    let { data, error, status } = await supabase
      .from("meetings")
      .select(`*`)
      .eq("customer_id", user.id);
    if (data !== null) {
      let i = 0;
      data.map((meeting) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: meeting.name,
            when: meeting.when,
            created_by: meeting.created_by,
            recurring_data: meeting.recurring_data,
            last_meeting: meeting.last_meeting,
            status: meeting.status,
            created: meeting.created_at,
          },
          ...rows,
        ];
      });
      console.log(data);
      setMeetings(rows);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 300,
      cellClassName: "name-column--cell",
    },
    {
      field: "when",
      headerName: "When",
      flex: 150,
    },
    {
      field: "created_by",
      headerName: "Ogranizer",
      flex: 200,
    },
    {
      field: "recurring_data",
      headerName: "Reccurs (days)",
      flex: 100,
    },
    {
      field: "last_meeting",
      headerName: "Last Held",
      flex: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 100,
    },
    {
      field: "invitebutton",
      headerName: "Invite",
      width: 100,
      renderCell: renderButton,
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
      <Header title="Meeting Manager" />
      <Box m="40px 0 0 0" height="75vh">
        <Button sx="margin:10px" color="secondary" variant="contained">
          New meeting
        </Button>
        <DataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rows={meetings}
          columns={columns}
          rowHeight={40}
        />
      </Box>
    </Box>
  );
};

export default Meetings;
