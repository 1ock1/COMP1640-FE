import "../helpers/document.css";
import React from "react";
import { Box, Button } from "@mui/material";
import { apiEndpointStaging, path } from "../helpers/apiEndpoints";
import axios from "axios";
import {
  DocumentEditorContainerComponent,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";
import { HelpTextDatInfor } from "./HelpTextDate";
DocumentEditorContainerComponent.Inject(Toolbar);

export const Document = ({
  id,
  allowedAction,
  role,
  setMakeEditted,
  setMakeUpdated,
  lastDateAction,
}) => {
  const [isDocumentChange, setDocumentChange] = React.useState(false);
  const [isUpdatedNewFile, setUpdatedNewFile] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  let container;
  async function save() {
    const file = id + ".docx";
    container.documentEditor.saveAsBlob("Docx").then((blob) => {
      const exportedDocument = blob;
      const formData = new FormData();
      formData.append("name", file);
      formData.append("data", exportedDocument);
      let req = new XMLHttpRequest();
      req.open("POST", apiEndpointStaging + path.file.save, true);
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 200) {
            setDocumentChange(false);
            setIsSaved(true);
          }
        }
      };
      req.send(formData);
    });
    if (role === "COORDINATOR") {
      setMakeEditted(true);
    }
    if (role === "STUDENT") {
      setMakeUpdated(true);
    }
  }
  const loadSfdt = () => {
    const file = id + ".docx";
    axios
      .get(apiEndpointStaging + path.file.load + file)
      .then((response) => {
        container.documentEditor.open(response.data);
      })
      .catch((error) => {});
  };
  const handleUpdateFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("guid", id);
    const response = await axios.put(
      apiEndpointLocal + path.file.update,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data === "Uploaded File Successfully") {
      setUpdatedNewFile(true);
    }
    if (role === "STUDENT") {
      setMakeUpdated(true);
    }
  };
  // const handleRemoveFile = () => {
  //   axios
  //     .delete(apiEndpointStaging + path.file.delete + "hehe.docx")
  //     .then((response) => console.log(response.data))
  //     .catch((err) => console.log(err));
  // };
  React.useEffect(() => {
    loadSfdt();
  });
  React.useEffect(() => {
    if (isSaved === true) {
      loadSfdt();
      setIsSaved(false);
    }
  }, [isSaved]);
  React.useEffect(() => {
    if (isUpdatedNewFile === true) {
      loadSfdt();
      setUpdatedNewFile(false);
    }
  }, [isUpdatedNewFile]);
  return (
    <>
      {id !== undefined && (
        <DocumentEditorContainerComponent
          id="container"
          ref={(scope) => {
            container = scope;
          }}
          height={"800px"}
          serviceUrl="https://localhost:7044/api/File"
          enableToolbar={true}
          // toolbarItems={items}
          // readOnly={true}
          showPropertiesPane={false}
          enableComment
          // enableLockAndEdit={true}
          // restrictEditing={true}
          enableAutoFocus={false}
          enableTrackChanges={true}
          contentChange={() => setDocumentChange(true)}
          zoomFactor={0.8}
          currentUser={role === "STUDENT" ? "Student" : "Coordinator"}
        />
      )}

      <Box mt={2} mb={2}>
        {allowedAction === true &&
        (role === "STUDENT" || role === "COORDINATOR") ? (
          <Button
            variant="contained"
            style={{
              marginRight: 20,
            }}
            onClick={save}
            disabled={!isDocumentChange}
          >
            Save
          </Button>
        ) : (
          ""
        )}
        {allowedAction === true && role === "STUDENT" ? (
          <>
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Update Current File
              <VisuallyHiddenInput
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleUpdateFile}
              />
            </Button>
          </>
        ) : (
          ""
        )}
        <HelpTextDatInfor
          text={"You can edit this report before "}
          date={lastDateAction}
        />

        {/* <Button
          variant="contained"
          style={{
            marginRight: 20,
          }}
          color="error"
          onClick={handleRemoveFile}
        >
          Remove
        </Button> */}
      </Box>
    </>
  );
};
