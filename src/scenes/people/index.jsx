import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { useProfile } from "utils/profile";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import {
  EditOutlined,
  PreviewOutlined,
  DeleteForeverOutlined,
  ForwardToInboxOutlined,
  PeopleAltOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import SimpleBackDrop from "../../components/SimpleBackDrop";

const People = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [people, setPeople] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const profile = useProfile();
  const user = profile.user;

  const supabase = useSupabaseClient();
  
  let rows = [];

  useEffect(() => {
    if (user) {
      getPeople();
      getGroups();
    }
  }, [user]);

  const renderIcon = (params) => {
    return (
    <>{params.value ? <WarningOutlined sx={{color:colors.redAccent[500]}} /> : null}</>
    );
  };

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

  async function getPeople() {

    setIsLoading(true);
    
    let { data, error } = await supabase
      .from("people")
      .select(`*`)
      .eq("customer_id", profile.customer.id);

    if (data !== null) {
      let i = 0;
      rows = [];
      data.map((person) => {
        i = i + 1;
        rows = [
          {
            id: i,
            full_name: person.full_name,
            email: person.email,
            title: person.title,
            departmenet: person.department,
            exposed: person.exposed,
            breached: person.breached,
          },
          ...rows,
        ];
      });
      setPeople(rows);
    } else {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  }

  async function getGroups() {
    setIsLoading(true);
    let { data, error } = await supabase
      .from("groups")
      .select(`*`)
      .eq("customer_id", profile.customer.id);
    if (data !== null) {
      let i = 0;
      rows = [];
      data.map((group) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: group.name,
            leader: group.leader,
          },
          ...rows,
        ];
      });
      setGroups(rows);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
    setIsLoading(false);
  }

  const peoplecolumns = [
    {
      field: "editbutton",
      headerName: "Edit",
      width: 50,
      renderCell: renderButton,
    },
    {
      field: "deletebutton",
      headerName: "Delete",
      width: 50,
      renderCell: renderButton,
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: 150,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 200,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 100,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 100,
    },
    {
      field: "breached",
      headerName: "Breached",
      flex: 65,
      renderCell: renderIcon,
    },
    {
      field: "exposed",
      headerName: "Exposed",
      flex: 65,
      renderCell: renderIcon,
    },
    {
      field: "invitebutton",
      headerName: "Invite",
      width: 100,
      renderCell: renderButton,
    },
  ];

  const groupcolumns = [
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
      field: "leader",
      headerName: "Leader",
      flex: 1,
    },
    {
      field: "membersbutton",
      headerName: "Members",
      width: 100,
      renderCell: renderButton,
    },
    {
      field: "invitebutton",
      headerName: "Invite",
      width: 100,
      renderCell: renderButton,
    },
  ];

  if (isLoading) {
    return <SimpleBackDrop />;
  }

  return (
    <Box m="20px">
      <Header title="Your Team" />
      <Box m="40px 0 0 0" height="35vh">
        {" "}
        <Button sx="margin:10px" color="secondary" variant="contained">
          New Person
        </Button>
        <DataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rows={people}
          columns={peoplecolumns}
          rowHeight={32}
        />
      </Box>
      <Box m="60px 0 0 0" height="35vh">
        {" "}
        <Button sx="margin:10px" color="secondary" variant="contained">
          New Group
        </Button>
        <DataGrid
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rows={groups}
          columns={groupcolumns}
          rowHeight={32}
        />
      </Box>
    </Box>
  );
};

export default People;
