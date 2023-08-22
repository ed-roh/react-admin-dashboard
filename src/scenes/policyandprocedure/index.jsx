import { Dialog, DialogTitle } from "@mui/material";
import Header from "../../components/Header";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Button, IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import {
  InputOutlined,
  EditOutlined,
  PublishedWithChangesOutlined,
  PreviewOutlined,
  CloseRounded,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import SimpleBackDrop from "../../components/SimpleBackDrop";
import { useProfile } from "utils/profile";
import { useNavigate } from "react-router-dom";

export default function PolicyandProcedure() {
  const supabase = useSupabaseClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const navigate = useNavigate()
  const profile = useProfile();
  const user = profile.user;
  console.log("profile", profile);

  useEffect(() => {
    if (user) {
      getPolicies();
    }
  }, [user]);

  useEffect(() => {
    if (name) {
      let raw = convertToRaw(editorState.getCurrentContent());
      saveContent(name, raw);
    }
  }, [editorState]);

  const openEditor = (name) => {
    console.log("opening: ", name);
    supabase
      .from("policies")
      .select("json")
      .eq("name", name)
      .eq("customer_id", profile.customer.id)
      .then((data) => {
        console.log("found data");
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.data[0].json))
          )
        );
      })
      .catch((err) => {
        console.log("no data");
        setEditorState(EditorState.createEmpty());
        console.log(err);
      });
    setName(name);
    setOpen(true);
  };

  function saveContent(name, raw) {
    console.log("saving", name, raw);
    setIsLoading(true);
    supabase
      .from("policies")
      .upsert({
        customer_id: profile.customer.id,
        name: name,
        json: JSON.stringify(raw),
        status: "Updated",
        modified_by: user.email,
        last_modified_at: "now()",
      })
      .select()
      .then((data) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  async function getPolicies() {
    let rows = [];
    let realrows = [];
    setIsLoading(true);
    supabase
      .from("policies")
      .select("*")
      .eq("customer_id", profile.customer.id)
      .then((data) => {
        realrows = data.data;

        supabase
          .from("policy_templates")
          .select("*")
          .then((data) => {
            rows = data.data.map((row, index) => ({
              id: index,
              name: row.name,
              status:
                realrows.find((r) => r.name === row.name)?.status || "Missing",
              owner: realrows.find((r) => r.name === row.name)?.owner || "",
              created_by:
                realrows.find((r) => r.name === row.name)?.created_by || "",
              created_at:
                realrows
                  .find((r) => r.name === row.name)
                  ?.created_at.slice(5, 10) +
                  "-" +
                  realrows
                    .find((r) => r.name === row.name)
                    ?.created_at.slice(0, 4) || "",
              modified_by:
                realrows.find((r) => r.name === row.name)?.modified_by || "",
              last_modified_at:
                realrows
                  .find((r) => r.name === row.name)
                  ?.last_modified_at.slice(5, 10) +
                  "-" +
                  realrows
                    .find((r) => r.name === row.name)
                    ?.last_modified_at.slice(0, 4) || "",
            }));
            setRows(rows);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }


  const renderButton = (params) => {
    return (
      <>
        {params.field === "editbutton" ? (
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => openEditor(params.row.name)}
          >
            <EditOutlined />
          </IconButton>
        ) : null}

        {params.field === "loadbutton" ? (
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => loadTemplate(params.row.name)}
          >
            <InputOutlined />
          </IconButton>
        ) : null}

        {params.field === "approvebutton" ? (
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => markApprove(params.row.name)}
          >
            <PublishedWithChangesOutlined />
          </IconButton>
        ) : null}

        {params.field === "reviewbutton" ? (
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => markReview(params.row.name)}
          >
            <PreviewOutlined />
          </IconButton>
        ) : null}
      </>
    );
  };

  const loadTemplate = async (name) => {
    supabase
    .from("policy_templates")
    .select("*")
    .eq("name", name)
    .then((data) => {
      console.log("found data", data.data)
      if (data.data[0]) {
        supabase
        .from("policies")
        .upsert({
          customer_id: profile.customer.id,
          name: name,
          json: data.data[0].json,
          status: "Imported",
          modified_by: user.email,
          last_modified_at: "now()",
        })
        .then((data) => {
          console.log('saved', data)
          getPolicies();
        })
      }
    })     
  };

  const markReview = async () => {};

  const markApprove = async () => {};

  const loadMissingTemplates = async () => {
    supabase
    .from("policy_templates")
    .select("*")
    .then((data) => {
      data.data.map((row, index) => (
        supabase
        .from("policies")
        .select('*')
        .eq("name", row.name)
        .eq("customer_id", profile.customer.id)
        .then((data) => {
          if (!data.data[0]) {
            loadTemplate(row.name)
          }
        })
      ))
    })
    getPolicies();
  };

  const markAllReview = async () => {};

  const markAllApprove = async () => {};

  const columns = [
    {
      field: "editbutton",
      headerName: "Edit",
      width: 40,
      renderCell: renderButton,
    },
    {
      field: "loadbutton",
      headerName: "Load",
      width: 50,
      renderCell: renderButton,
    },
    {
      field: "reviewbutton",
      headerName: "Review",
      width: 50,
      renderCell: renderButton,
    },
    {
      field: "approvebutton",
      headerName: "Approve",
      width: 65,
      renderCell: renderButton,
    },
    { field: "name", headerName: "Document Name", width: 250 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "owner", headerName: "Owner", width: 100 },
    { field: "created_at", headerName: "Created", width: 120 },
    { field: "last_modified_at", headerName: "Last Modified", width: 120 },
    { field: "modified_by", headerName: "Modified By", width: 175 },
    { field: "next_review", headerName: "Next Review", width: 120 },
  ];



  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[500],
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme.palette.secondary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            ODD_OPACITY - 0.1
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));

  if (isLoading) {
    return <SimpleBackDrop />;
  }

  return (
    <>
      <Box>
        <Dialog
          maxWidth="lg"
          PaperProps={{
            sx: {
              minHeight: "80vh",
            },
          }}
          open={open}
          onClose={() => saveContent(name, editorState.getCurrentContent())}
        >
          <IconButton onClick={() => setOpen(false)}>
            <CloseRounded />
          </IconButton>

          <DialogTitle>Policy Editor :: Editing {name} </DialogTitle>
          <Box m={2}>
            <Editor
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </Box>
        </Dialog>
      </Box>
      <Box m="20px">
        <Header title="Policy and Procedure Library" />
      </Box>
      <Box m="30px 30px" height="75vh" width="80vw">
        <Box m="30px 30px"></Box>
        <Box height="75vh">
          <Button
            sx="margin:10px"
            color="secondary"
            variant="contained"
            onClick={loadMissingTemplates}
          >
            Load Templates for Missing
          </Button>
          <Button
            sx="margin:10px"
            color="secondary"
            variant="contained"
            onClick={markAllReview}
          >
            Mark All for Review
          </Button>
          <Button
            sx="margin:10px"
            color="secondary"
            variant="contained"
            onClick={markAllApprove}
          >
            Mark All for Approval
          </Button>
          <DataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            rows={rows}
            columns={columns}
            rowHeight={32}
          />
        </Box>
      </Box>
    </>
  );
}
