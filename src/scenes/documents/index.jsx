import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useProfile } from "utils/profile";
import SimpleBackDrop from "../../components/SimpleBackDrop";

export default function DocumentLibrary() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const profile = useProfile();
  const user = profile.user;

  const supabase = useSupabaseClient();

  const columns = [
    { field: "name", headerName: "Document Name", width: 300 },
    { field: "type", headerName: "File Type" },
    { field: "size", headerName: "Size" },
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
      .upload(profile.customer.id + "/" + file.name, file);

    if (data) {
      getDocuments();
    } else {
      console.log(error);
    }
  }

  async function getDocuments() {
    setIsLoading(true);
    const { data, error } = await supabase.storage
      .from("Document Library")
      .list(profile.customer.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {
      let i = 0;
      let rows = [];
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
        setDocuments(rows);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);

  }

  if (isLoading) {
    return <SimpleBackDrop />;
  }

  const fileTypes = ["DOCX", "DOC", "PDF", "TXT", "XLSX", "XLS", "PPTX", "PPT"];

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
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </Box>
    </>
  );
}
