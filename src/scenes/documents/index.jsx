import { Typography } from "@mui/material";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DocumentLibrary() {
  const [documents, setDocuments] = useState([]);

  const user = useUser();
  const supabase = useSupabaseClient();
  let rows = [];

  const columns = [
    { field: "name", headerName: "Document Name", width: 300 },
    { field: "type", headerName: "File Type" },
    { field: "size", headerName: "Size"},
    { field: "created_at", headerName: "Created" },
    { field: "last_modified_at", headerName: "Modified" },
  ];

  useEffect(() => {
    if (user) {
      getDocuments();
    }
  }, [user]);

  async function uploadFile(file) {

    const { data, error } = await supabase.storage
      .from("Document Library")
      .upload(user.id + "/" + file.name, file);

    if (data) {
      getDocuments();
    } else {
      console.log(error);
    }
  }

  async function getDocuments() {
    const { data, error } = await supabase.storage
      .from("Document Library")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
    if (data !== null) {
      let i = 0;
      data.map((doc) => {
        i = i + 1;
        rows = [
          {
            id: i,
            name: doc.name,
            size: doc.metadata.size,
            created_at: doc.created_at,
            last_modified_at: doc.metadata.lastModified,
            type: doc.metadata.mimetype,
          },
          ...rows,
        ];
      });
      console.log(data)
      setDocuments(rows);
    } else {
      alert("Error loading documents");
      console.log(error);
    }
  }

  const fileTypes = ["DOCX", "DOC", "PDF", "TXT", "XLSX", "XLS", "PPTX", "PPT"];
  console.log(rows);
  return (
    <>
    <Box m="30px 30px" height="75vh">
    <h1>Documentation Library</h1>
      <Box m="30px 30px">
      <FileUploader
        handleChange={(file) => uploadFile(file)}
        name="documents"
        types={fileTypes}
      />
      </Box>
      <Box height="75vh">
      <DataGrid
        rows={documents}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[25]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
      />
      </Box>
    </Box>
    </>
  );
}
