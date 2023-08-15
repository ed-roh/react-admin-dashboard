import { Typography } from "@mui/material";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Box, Button, IconButton } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import {
  InputOutlined,
  EditOutlined,
  PublishedWithChangesOutlined,
  PreviewOutlined,
  Style,
} from "@mui/icons-material";

export default function Billing() {
 
  const user = useUser();
  const supabase = useSupabaseClient();

 
  return (
    <Box m="30px 30px" height="75vh">
      <h1>Not Implemented Yet</h1>
      <Box m="30px 30px"></Box>
    </Box>
  );
}
