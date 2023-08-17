import { Typography } from "@mui/material";
import Header from "../../components/Header";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import {
  InputOutlined,
  EditOutlined,
  PublishedWithChangesOutlined,
  PreviewOutlined,
} from "@mui/icons-material";

export default function PolicyandProcedure() {
  const [documents, setDocuments] = useState([]);

  const user = useUser();
  const supabase = useSupabaseClient();

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
          {params.field === "loadbutton" ? <InputOutlined /> : null}
          {params.field === "approvebutton" ? (
            <PublishedWithChangesOutlined />
          ) : null}
          {params.field === "reviewbutton" ? <PreviewOutlined /> : null}
        </IconButton>
      </strong>
    );
  };

  const loadTemplate = async () => {
  }

  const markReview = async () => {
  }

  const markApprove = async () => {
  }
    
  const loadMissingTemplates = async () => {
  }
  
  const markAllReview = async () => {
  }
  
  const markAllApprove = async () => {
  }

  const columns = [
    {
      field: "editbutton",
      headerName: "Edit",
      width: 50,
      renderCell: renderButton,
    },
    {
      field: "loadbutton",
      headerName: "Load",
      width: 100,
      renderCell: renderButton,
    },
    { field: "name", headerName: "Document Name", width: 300 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "created_by", headerName: "Created By", width: 150 },
    { field: "created_at", headerName: "Created", width: 150 },
    { field: "modified_by", headerName: "Modified By", width: 150 },
    { field: "last_modified_at", headerName: "Modified", width: 150 },
    { field: "next_review", headerName: "Next Review", width: 150 },
    {
      field: "reviewbutton",
      headerName: "Review",
      width: 65,
      renderCell: renderButton,
    },
    {
      field: "approvebutton",
      headerName: "Approve",
      width: 75,
      renderCell: renderButton,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Acceptable Use Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 2,
      name: "Account and Access Management Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 3,
      name: "Asset Inventory Procedure",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 4,
      name: "Change Control Policy and Procedures",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 5,
      name: "Information/Data Security Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 6,
      name: "Disaster Recovery / Business Continuity Plan",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 7,
      name: "HR Onboarding and Offboarding Policies",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 8,
      name: "Incident Response Plan",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 9,
      name: "Internal Audit / Continuous Improvement Plan",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 10,
      name: "Server Management Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 11,
      name: "Workstation Management Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 12,
      name: "Mobile Device Management Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 13,
      name: "Remote Work and BYOD Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 14,
      name: "Physical Access Control Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 15,
      name: "Risk Management Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 16,
      name: "Software Update Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 17,
      name: "Network Security Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 18,
      name: "Identity & Credential Management Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 19,
      name: "Security Awareness and Training Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 20,
      name: "Financial Controls Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 21,
      name: "Child Safety Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 22,
      name: "Volunteer Onboarding Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
    {
      id: 23,
      name: "Safeguarding Member Information Policy",
      status: "Missing",
      created_by: "",
      created_at: "",
      modified_by: "",
      last_modified_at: "",
    },
  ];

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[500],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.secondary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.secondary.main,
          ODD_OPACITY - 0.1        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

  return (
    <>
    <Box m="20px">
    <Header
      title="Policy and Procedure Library"
    />
    </Box> 
    <Box m="30px 30px" height="75vh">
        <Box m="30px 30px"></Box>
      <Box height="75vh">
        <Button sx="margin:10px" color="secondary" variant="contained" onClick={loadMissingTemplates}>
          Load Templates for Missing
        </Button>
        <Button sx="margin:10px" color="secondary" variant="contained" onClick={markAllReview}>
          Mark All for Review
        </Button>
        <Button sx="margin:10px" color="secondary" variant="contained" onClick={markAllApprove}>
          Mark All for Approval
        </Button>
        <DataGrid
          getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd' }
          rows={rows}
          columns={columns}
         rowHeight={32}
        />
      </Box>
    </Box>
    </>
  );
}
