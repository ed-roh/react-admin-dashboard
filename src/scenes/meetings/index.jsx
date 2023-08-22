

import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { supabase } from "../../supabase";
import { useState, useEffect } from "react";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  EditOutlined,
  PreviewOutlined,
  DeleteForeverOutlined,
  ForwardToInboxOutlined,
  Style,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { useProfile } from "utils/profile";
import SimpleBackDrop from "../../components/SimpleBackDrop";

const Meetings = () => {
  const theme = useTheme();
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const profile = useProfile();
  const user = profile.user;

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
          {params.field === "membersbutton" ? <PeopleAltOutlined /> : null}

        </IconButton>
      </strong>
    );
  };

  async function getMeetings() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("meetings")
      .select(`*`)
      .eq("customer_id", profile.customer.id);
    if (data !== null) {
      let i = 0;
      let rows = [];
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
        setMeetings(rows);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
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
      field: "membersbutton",
      headerName: "Members",
      width: 100,
      renderCell: renderButton,
    },
  ];

  if (isLoading) {
    return <SimpleBackDrop />;
  }
  
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
